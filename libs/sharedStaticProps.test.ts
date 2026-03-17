import type { PageObject } from 'libs/@type/api/notion'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Why: Notion API への実通信を避け、変換ロジックのみをテストする
vi.mock('libs/notion', () => ({
  getDatabase: vi.fn(),
  getProperties: vi.fn(),
}))

import { getDatabase, getProperties } from 'libs/notion'
import { getSharedStaticProps } from './sharedStaticProps'

const mockGetDatabase = vi.mocked(getDatabase)
const mockGetProperties = vi.mocked(getProperties)

// Why: PageObject の型は複雑なため、テストに必要な最小限のフィールドのみ持つモックを使用
const createMockPage = (id: string) => ({ id }) as unknown as PageObject

describe('getSharedStaticProps', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Notion DB からソーシャルリンクを取得して SnsLink[] に変換する', async () => {
    const page1 = createMockPage('1')
    const page2 = createMockPage('2')
    mockGetDatabase.mockResolvedValue([page1, page2])

    mockGetProperties.mockImplementation((page, { name, type }) => {
      if (page === page1) {
        if (name === 'name' && type === 'title') return 'Twitter'
        if (name === 'url' && type === 'url') return 'https://twitter.com/example'
        if (name === 'mobileLUrl' && type === 'rich_text') return null
      }
      if (page === page2) {
        if (name === 'name' && type === 'title') return 'Tumblr'
        if (name === 'url' && type === 'url') return 'https://tumblr.com/example'
        if (name === 'mobileLUrl' && type === 'rich_text') return 'tumblr'
      }
      return null
    })

    const result = await getSharedStaticProps()

    expect(result.socialLinks).toEqual([
      { text: 'Twitter', url: 'https://twitter.com/example' },
      { text: 'Tumblr', url: 'https://tumblr.com/example', mobileLUrl: 'tumblr' },
    ])
  })

  it('name または url が欠けているページはスキップされる', async () => {
    const validPage = createMockPage('valid')
    const noNamePage = createMockPage('no-name')
    const noUrlPage = createMockPage('no-url')
    mockGetDatabase.mockResolvedValue([validPage, noNamePage, noUrlPage])

    mockGetProperties.mockImplementation((page, { name, type }) => {
      if (page === validPage) {
        if (name === 'name' && type === 'title') return 'GitHub'
        if (name === 'url' && type === 'url') return 'https://github.com/example'
      }
      if (page === noNamePage) {
        if (name === 'name' && type === 'title') return null
        if (name === 'url' && type === 'url') return 'https://example.com'
      }
      if (page === noUrlPage) {
        if (name === 'name' && type === 'title') return 'NoUrl'
        if (name === 'url' && type === 'url') return null
      }
      return null
    })

    const result = await getSharedStaticProps()

    expect(result.socialLinks).toEqual([{ text: 'GitHub', url: 'https://github.com/example' }])
  })

  it('DB が空の場合は空配列を返す', async () => {
    mockGetDatabase.mockResolvedValue([])

    const result = await getSharedStaticProps()

    expect(result.socialLinks).toEqual([])
  })

  it('mobileLUrl がない場合はフィールド自体が含まれない', async () => {
    const page = createMockPage('1')
    mockGetDatabase.mockResolvedValue([page])

    mockGetProperties.mockImplementation((_page, { name, type }) => {
      if (name === 'name' && type === 'title') return 'pixiv'
      if (name === 'url' && type === 'url') return 'https://pixiv.net/users/0'
      if (name === 'mobileLUrl' && type === 'rich_text') return null
      return null
    })

    const result = await getSharedStaticProps()

    expect(result.socialLinks).toEqual([{ text: 'pixiv', url: 'https://pixiv.net/users/0' }])
    // Why: getStaticProps は undefined をシリアライズできないため、
    // mobileLUrl キー自体が存在しないことを確認
    expect(result.socialLinks[0]).not.toHaveProperty('mobileLUrl')
  })
})
