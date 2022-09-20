import { events } from 'pages/api/about/events'
import { links } from 'pages/api/about/links'
import { genres } from 'pages/api/about/workExperiences/genres'
import { workExperience } from 'pages/api/about/workExperiences/workExperiences'
// おれおれAPI
export const aboutData = {
  links,
  events,
  workExperience,
  genres
}
