import type { Client } from '@notionhq/client'

export type PageObject = ElementType<Awaited<ReturnType<Client['databases']['query']>>['results']>

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
