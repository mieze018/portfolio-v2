import { EB_Garamond, Noto_Serif_JP } from 'next/font/google'

export const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-jp',
})
export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-en',
})
