export type genresType = '文芸書 装画' | '文芸誌 扉絵' | 'その他'

export interface work {
  gジャンル: genresType
  k形態?: '単行本' | '文庫本' | string
  s出版社?: string
  tタイトル: string
  t著者?: string
  dデザイン?: string
  n発表年月?: string
}

export type works = work[]

export interface eventType {
  title: string
  description?: string
  date: string
  place: string
  url?: string
}

export interface infoDataType {
  events: eventType[]
}
