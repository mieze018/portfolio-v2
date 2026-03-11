import type { Client } from '@notionhq/client'

// Why: Notion API v2025-09-03 で dataSources.query() に移行
// dataSources.query() の results は PageObject | DataSourceObject のユニオン型だが、
// ページクエリでは PageObject のみ返されるため、従来通りの型を維持
export type PageObject = ElementType<Awaited<ReturnType<Client['dataSources']['query']>>['results']>

export type BlockObject = ElementType<
  Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
>
type propertiesTypes =
  | 'select'
  | 'title'
  | 'rich_text'
  | 'number'
  | 'multi_select'
  | 'date'
  | 'people'
  | 'file'
  | 'checkbox'
  | 'url'
  | 'email'
  | 'phone_number'
  | 'formula'
  | 'relation'
  | 'rollup'
  | 'created_time'
  | 'created_by'
  | 'last_edited_time'
  | 'last_edited_by'
