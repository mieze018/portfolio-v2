import type { PageObject } from 'libs/@type/api/notion'
import type { portfolioContentType } from 'libs/contentTypes'
import { getDatabase, getPage } from 'libs/notion'
import {
  eventDBId,
  prizesDBId,
  workAcceptanceStatusDBId,
  workExperienceDBId,
  workExperienceGenreDBId,
} from 'libs/notionDB'
import { getSharedStaticProps } from 'libs/sharedStaticProps'
import { getTumblrPosts } from 'libs/tumblr'

// Why: ページごとの同じ API 呼び出しを避け、1ビルド内の投稿一覧を揃える。
let content: Promise<portfolioContentType> | undefined

const loadContent = async (): Promise<portfolioContentType> => {
  // Why: 認証失敗時に自動で偽データへ切り替えず、明示的な検証モードだけ許可する。
  if (import.meta.env.MODE === 'fixtures') {
    const { fixtureContent } = await import('libs/test/fixtureContent')
    return fixtureContent
  }

  const token =
    import.meta.env.NOTION_TOKEN ||
    import.meta.env.NEXT_PUBLIC_NOTION_TOKEN ||
    process.env.NOTION_TOKEN ||
    process.env.NEXT_PUBLIC_NOTION_TOKEN
  const apiKey =
    import.meta.env.TUMBLR_API_KEY ||
    import.meta.env.NEXT_PUBLIC_api_Key ||
    process.env.TUMBLR_API_KEY ||
    process.env.NEXT_PUBLIC_api_Key
  if (!token || !apiKey) {
    throw new Error(
      'Set NOTION_TOKEN and TUMBLR_API_KEY for a real build; use pnpm build:fixtures for offline validation.'
    )
  }

  const posts = await getTumblrPosts(apiKey)
  const { socialLinks } = await getSharedStaticProps()
  // Why: Notion のレート制限を避けるため、DB は順に読み込む。
  const prizes = (await getDatabase(prizesDBId, { sortProperty: 'date' })) as PageObject[]
  const workExperience = (await getDatabase(workExperienceDBId, {
    sortProperty: 'date',
  })) as PageObject[]
  const workExperienceGenre = (await getDatabase(workExperienceGenreDBId, {
    sortProperty: 'sort',
    sortDirection: 'ascending',
  })) as PageObject[]
  const events = (await getDatabase(eventDBId)) as PageObject[]
  const workAcceptanceStatus = (await getPage(workAcceptanceStatusDBId)) as PageObject

  return {
    posts,
    socialLinks,
    about: { prizes, workExperience, workExperienceGenre, events },
    contact: { workAcceptanceStatus },
  }
}

export const getContent = () => {
  content ??= loadContent()
  return content
}
