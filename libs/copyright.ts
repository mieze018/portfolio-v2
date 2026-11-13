import { author } from 'libs/site'

export const copyright = () => {
  const now = new Date()
  const this_year = now.getFullYear()
  const start_year = 2009
  const copyrightPrefix = '©'
  return `${copyrightPrefix} ${start_year} - ${this_year} ${author}`
}
