
export namespace LocalApi {
  /**  SNSリンク */
  export interface SnsLink { text: string, url: string, mobileLUrl?: string }
  /** イベント */
  export interface Event {
    title: string
    description?: string
    date: string
    place: string
    url?: string
  }
  /** 仕事の経験 */
  export namespace WorkExperience {

    export interface Work {
      genre: Genre
      format?: '単行本' | '文庫本' | string
      publisher?: string
      title: string
      author?: string
      designer?: string
      releaseMonth?: string
    }

    export type GenreGroup = { [key: string]: string }
  }

  export interface infoDataType {
    events: Event[]
  }
}
