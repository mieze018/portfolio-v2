import type { LocalApi } from "libs/@type/api/local";

export const links: LocalApi.SnsLink[] = [
  {
    text: 'Twitter',
    url: process.env.NEXT_PUBLIC_twitter_url || '',
  },
  {
    text: 'pixiv',
    url: process.env.NEXT_PUBLIC_pixiv_url || '',
  },
  {
    text: 'Instagram',
    url: process.env.NEXT_PUBLIC_instagram_url || '',
  },
  {
    text: 'Deviantart',
    url: process.env.NEXT_PUBLIC_deviantart_url || '',
  },
  {
    text: 'Behance',
    url: process.env.NEXT_PUBLIC_behance_url || '',
  },
  {
    text: 'Tumblr',
    url: `https://www.tumblr.com/blog/${process.env.NEXT_PUBLIC_Tumblr_username}/` || '',
    mobileLUrl: 'tumblr',
  },
  {
    text: 'booth',
    url: process.env.NEXT_PUBLIC_booth_url || '',
  },
]
