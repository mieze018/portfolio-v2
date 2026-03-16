import { beforeEach, describe, expect, it, vi } from 'vitest'

// Why: vi.mock は hoist されるため、vi.hoisted() でモック関数を先に宣言する
const { mockRetrieve, mockQuery, mockPageRetrieve } = vi.hoisted(() => ({
  mockRetrieve: vi.fn(),
  mockQuery: vi.fn(),
  mockPageRetrieve: vi.fn(),
}))

// Why: Notion Client は new で呼ばれるため、class でモックする
vi.mock('@notionhq/client', () => ({
  Client: class MockClient {
    databases = { retrieve: mockRetrieve }
    dataSources = { query: mockQuery }
    pages = { retrieve: mockPageRetrieve }
  },
}))

import { getDatabase, getPage, getProperties } from './notion'

describe('notion API ラッパー', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getDatabase', () => {
    it('データベースを取得してソート付きでクエリする', async () => {
      mockRetrieve.mockResolvedValue({
        data_sources: [{ id: 'ds-123' }],
      })
      mockQuery.mockResolvedValue({
        results: [{ id: 'page-1' }, { id: 'page-2' }],
      })

      const results = await getDatabase('db-abc')

      expect(mockRetrieve).toHaveBeenCalledWith({ database_id: 'db-abc' })
      expect(mockQuery).toHaveBeenCalledWith({
        data_source_id: 'ds-123',
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      })
      expect(results).toHaveLength(2)
    })

    it('sortProperty を指定するとプロパティソートになる', async () => {
      mockRetrieve.mockResolvedValue({
        data_sources: [{ id: 'ds-123' }],
      })
      mockQuery.mockResolvedValue({ results: [] })

      await getDatabase('db-abc', {
        sortProperty: 'Name',
        sortDirection: 'ascending',
      })

      expect(mockQuery).toHaveBeenCalledWith({
        data_source_id: 'ds-123',
        sorts: [{ property: 'Name', direction: 'ascending' }],
      })
    })

    it('data_sources が空の場合エラーを投げる', async () => {
      mockRetrieve.mockResolvedValue({ data_sources: [] })

      await expect(getDatabase('db-empty')).rejects.toThrow('Database db-empty has no data sources')
    })
  })

  describe('getPage', () => {
    it('ページ ID でページを取得する', async () => {
      const mockPage = { id: 'page-1', properties: {} }
      mockPageRetrieve.mockResolvedValue(mockPage)

      const result = await getPage('page-1')

      expect(mockPageRetrieve).toHaveBeenCalledWith({ page_id: 'page-1' })
      expect(result).toEqual(mockPage)
    })
  })

  describe('getProperties', () => {
    it('select プロパティの name を返す', () => {
      const obj = {
        properties: { Status: { select: { name: 'Done' } } },
      }
      expect(getProperties(obj as never, { name: 'Status', type: 'select' })).toBe('Done')
    })

    it('title プロパティの plain_text を返す', () => {
      const obj = {
        properties: { Name: { title: [{ plain_text: 'テスト' }] } },
      }
      expect(getProperties(obj as never, { name: 'Name', type: 'title' })).toBe('テスト')
    })

    it('rich_text プロパティの plain_text を返す', () => {
      const obj = {
        properties: { Desc: { rich_text: [{ plain_text: '説明文' }] } },
      }
      expect(getProperties(obj as never, { name: 'Desc', type: 'rich_text' })).toBe('説明文')
    })

    it('number プロパティの値を返す', () => {
      const obj = { properties: { Count: { number: 42 } } }
      expect(getProperties(obj as never, { name: 'Count', type: 'number' })).toBe(42)
    })

    it('checkbox プロパティの真偽値を返す', () => {
      const obj = { properties: { Active: { checkbox: true } } }
      expect(getProperties(obj as never, { name: 'Active', type: 'checkbox' })).toBe(true)
    })

    it('url プロパティの値を返す', () => {
      const obj = { properties: { Link: { url: 'https://example.com' } } }
      expect(getProperties(obj as never, { name: 'Link', type: 'url' })).toBe('https://example.com')
    })

    it('date プロパティのオブジェクトを返す', () => {
      const dateObj = { start: '2024-01-01', end: null }
      const obj = { properties: { Date: { date: dateObj } } }
      expect(getProperties(obj as never, { name: 'Date', type: 'date' })).toEqual(dateObj)
    })

    it('multi_select プロパティの配列を返す', () => {
      const tags = [{ name: 'tag1' }, { name: 'tag2' }]
      const obj = { properties: { Tags: { multi_select: tags } } }
      expect(getProperties(obj as never, { name: 'Tags', type: 'multi_select' })).toEqual(tags)
    })

    it('file プロパティの URL を返す', () => {
      const obj = {
        properties: { Image: { file: { url: 'https://example.com/img.png' } } },
      }
      expect(getProperties(obj as never, { name: 'Image', type: 'file' })).toBe(
        'https://example.com/img.png'
      )
    })

    it('relation プロパティの最初の要素を返す', () => {
      const relation = { id: 'rel-1' }
      const obj = { properties: { Related: { relation: [relation] } } }
      expect(getProperties(obj as never, { name: 'Related', type: 'relation' })).toEqual(relation)
    })

    it('rollup プロパティのオブジェクトを返す', () => {
      const rollup = { type: 'number', number: 100 }
      const obj = { properties: { Total: { rollup } } }
      expect(getProperties(obj as never, { name: 'Total', type: 'rollup' })).toEqual(rollup)
    })

    it('存在しないプロパティ名で null を返す', () => {
      const obj = { properties: {} }
      expect(getProperties(obj as never, { name: 'Missing', type: 'title' })).toBeNull()
    })

    it('未対応の type で null を返す', () => {
      const obj = { properties: { Foo: { unknown: 'value' } } }
      expect(getProperties(obj as never, { name: 'Foo', type: 'unknown' as never })).toBeNull()
    })
  })
})
