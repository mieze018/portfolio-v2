import { Client } from '@notionhq/client'

import type { QueryDataSourceParameters } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth:
    import.meta.env.NOTION_TOKEN ||
    import.meta.env.NEXT_PUBLIC_NOTION_TOKEN ||
    process.env.NOTION_TOKEN ||
    process.env.NEXT_PUBLIC_NOTION_TOKEN,
})

// Why: Notion API v2025-09-03 で database と data_source が分離された
// database_id から data_source_id を解決するヘルパー
// Trade-off: ビルド時に1DB毎に追加APIコールが発生するが、getStaticPropsのみで使用するため許容範囲
const resolveDataSourceId = async (databaseId: string): Promise<string> => {
  const database = await notion.databases.retrieve({ database_id: databaseId })
  if (!('data_sources' in database) || database.data_sources.length === 0) {
    throw new Error(`Database ${databaseId} has no data sources`)
  }
  return database.data_sources[0].id
}

type getDatabaseOptions = {
  sortProperty?: string
  sortDirection?: 'ascending' | 'descending'
}
export const getDatabase = async (
  databaseId: string,
  { sortProperty, sortDirection = 'descending' }: getDatabaseOptions = {}
) => {
  const dataSourceId = await resolveDataSourceId(databaseId)

  // Why: sortProperty 未指定の場合は sorts を渡さず Notion DB の表示順をそのまま使う
  // Trade-off: 以前は created_time 降順をデフォルトとしていたが、
  //   DB 側で手動並び替えしても反映されない問題があったため廃止
  const sorts: QueryDataSourceParameters['sorts'] = sortProperty
    ? [{ property: sortProperty, direction: sortDirection }]
    : []

  const results: Awaited<ReturnType<typeof notion.dataSources.query>>['results'] = []
  let cursor: string | undefined
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      ...(sorts.length > 0 && { sorts }),
      ...(cursor ? { start_cursor: cursor } : {}),
    })
    results.push(...response.results)
    if (!response.has_more) break
    if (!response.next_cursor || response.next_cursor === cursor) {
      throw new Error('Notion pagination returned an invalid cursor')
    }
    cursor = response.next_cursor
  } while (cursor)
  return results
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export { getProperties } from './notionProperties'
