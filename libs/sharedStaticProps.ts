import type { LocalApi } from 'libs/@type/api/local'
import type { PageObject } from 'libs/@type/api/notion'
import { getDatabase, getProperties } from 'libs/notion'
import { snsLinkDBId } from 'libs/notionDB'

export type sharedStaticPropsType = {
  socialLinks: LocalApi.SnsLink[]
}

// Why: Notion PageObject から LocalApi.SnsLink への変換を一箇所に集約
// Notion DB のプロパティ名 (name, url, mobileLUrl) → SnsLink の型 (text, url, mobileLUrl)
const toSnsLink = (page: PageObject): LocalApi.SnsLink | null => {
  const text = getProperties(page, { name: 'name', type: 'title' })
  const url = getProperties(page, { name: 'url', type: 'url' })
  if (!text || !url) return null

  const mobileLUrl = getProperties(page, { name: 'mobileLUrl', type: 'rich_text' })

  // Why: getStaticProps は undefined をシリアライズできないため、値がある場合のみフィールドを含める
  return mobileLUrl ? { text, url, mobileLUrl } : { text, url }
}

const getSocialLinks = async (): Promise<LocalApi.SnsLink[]> => {
  // Why: Notion DB の order 列で昇順ソートすることで表示順を明示的に管理する
  // Alternative: sorts 未指定の場合は作成順になりユーザーが制御できないため採用しない
  const pages = await getDatabase(snsLinkDBId, {
    sortProperty: 'order',
    sortDirection: 'ascending',
  })
  return pages.map(toSnsLink).filter((link): link is LocalApi.SnsLink => link !== null)
}

// Why: 全ページの getStaticProps で共有するデータを一箇所から取得
// Future: Footer に表示する他の共有データもここに追加できる
export const getSharedStaticProps = async (): Promise<sharedStaticPropsType> => {
  const socialLinks = await getSocialLinks()
  return { socialLinks }
}
