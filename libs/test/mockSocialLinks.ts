import type { LocalApi } from 'libs/@type/api/local'

// Why: Stories とテストで共通のモックデータを使い、SocialIconDecider が実際にアイコンを描画できるよう
// 本物のサービス名を使用する。SocialIconDecider の全 case を網羅することで
// Storybook 上で全アイコンの表示確認ができる。
export const mockSocialLinks: LocalApi.SnsLink[] = [
  { text: 'X', url: 'https://x.com/example' },
  { text: 'GitHub', url: 'https://github.com/example' },
  { text: 'Instagram', url: 'https://www.instagram.com/example' },
  { text: 'pixiv', url: 'https://www.pixiv.net/users/0' },
  { text: 'Tumblr', url: 'https://www.tumblr.com/blog/example', mobileLUrl: 'tumblr' },
  { text: 'Deviantart', url: 'https://www.deviantart.com/example' },
  { text: 'Pinterest', url: 'https://www.pinterest.com/example' },
  { text: 'Behance', url: 'https://www.behance.net/example' },
  { text: 'Gumroad', url: 'https://example.gumroad.com' },
  { text: 'Booth', url: 'https://example.booth.pm' },
]
