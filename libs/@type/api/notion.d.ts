import type { Client } from '@notionhq/client'

// Why: Notion API v2025-09-03 で dataSources.query() に移行
// dataSources.query() の results は PageObject | DataSourceObject のユニオン型だが、
// ページクエリでは PageObject のみ返されるため、従来通りの型を維持
export type PageObject = ElementType<Awaited<ReturnType<Client['dataSources']['query']>>['results']>

export type BlockObject = ElementType<
  Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
>
