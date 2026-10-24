import type { PageObject } from 'libs/@type/api/notion'
import type { Tumblr } from 'libs/@type/api/tumblr'
import type { portfolioContentType } from 'libs/contentTypes'
import { tags } from 'libs/tags'

const post = (id: string, tag: string, caption: string): Tumblr.Post =>
  ({
    id: Number(id),
    id_string: id,
    type: 'photo',
    date: '2026-10-01 12:00:00 GMT',
    tags: [tag],
    caption: `<p>${caption}</p>`,
    photos: [
      {
        caption,
        original_size: { url: '/fixture-artwork.svg', width: 1200, height: 800 },
        alt_sizes: [],
      },
    ],
  }) as unknown as Tumblr.Post

// Why: 実 API、個人情報、外部画像に依存せず移植の動作を検証する専用データ。
export const fixtureContent: portfolioContentType = {
  posts: [
    post('10001', tags.personalWork, 'Migration preview — personal work'),
    post('10002', tags.commissionedWork, 'Migration preview — commissioned work'),
  ],
  socialLinks: [{ text: 'Tumblr', url: 'https://mieze018.tumblr.com' }],
  about: { prizes: [], workExperience: [], workExperienceGenre: [], events: [] },
  contact: {
    workAcceptanceStatus: {
      id: 'fixture-status',
      properties: {
        ja: { type: 'rich_text', rich_text: [{ plain_text: '移行検証用のプレビューです。' }] },
        en: { type: 'rich_text', rich_text: [{ plain_text: 'Migration preview only.' }] },
      },
    } as unknown as PageObject,
  },
}
