import type { Client } from '@notionhq/client'

// Why: Notion API v2025-09-03 で dataSources.query() に移行
// dataSources.query() の results は PageObject | DataSourceObject のユニオン型だが、
// ページクエリでは PageObject のみ返されるため、従来通りの型を維持
export type PageObject = ElementType<Awaited<ReturnType<Client['dataSources']['query']>>['results']>

// Why: getProperties() の公開APIを変えずに既存呼び出し側との互換性を維持する
// Trade-off: 命名は既存の propertiesTypes を踏襲するため一般的ではないが、影響範囲を最小化できる
export type propertiesTypes =
  | 'select'
  | 'title'
  | 'rich_text'
  | 'number'
  | 'multi_select'
  | 'date'
  | 'file'
  | 'checkbox'
  | 'url'
  | 'relation'
  | 'rollup'

export type BlockObject = ElementType<
  Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
>
