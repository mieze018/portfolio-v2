
export const Genres = ['文芸書 装画', '文芸誌 扉絵', 'その他'] as const

export type work = {
  gジャンル: typeof Genres[number]
  k形態?: '単行本' | '文庫本' | string
  s出版社?: string
  tタイトル: string
  t著者?: string
  dデザイン?: string
  n発表年月?: string
}

export type works = work[]

export type event = {
  tタイトル: string
  n日時: string
  b場所: string
}

export type events = event[]
