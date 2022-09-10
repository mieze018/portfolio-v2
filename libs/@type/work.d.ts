export type genresType = '文芸書 装画' | '文芸誌 扉絵' | 'その他'

export interface work {
  genre: genresType
  format?: '単行本' | '文庫本' | string
  publisher?: string
  title: string
  author?: string
  designer?: string
  releaseMonth?: string
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
