import type { LocalApi } from 'libs/@type/api/local'
import type { PageObject } from 'libs/@type/api/notion'
import type { Tumblr } from 'libs/@type/api/tumblr'

export type aboutDataType = {
  socialLinks: LocalApi.SnsLink[]
  fallbackData: {
    prizes: PageObject[]
    workExperience: PageObject[]
    workExperienceGenre: PageObject[]
    events: PageObject[]
  }
}

export type contactDataType = {
  fallbackData: { workAcceptanceStatus: PageObject }
}

export type portfolioContentType = {
  posts: Tumblr.Post[]
  socialLinks: LocalApi.SnsLink[]
  about: aboutDataType['fallbackData']
  contact: contactDataType['fallbackData']
}
