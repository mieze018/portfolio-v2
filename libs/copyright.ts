import { author } from "pages/api/basics"

export const copyright = () => {
  const now = new Date()
  const this_year = now.getFullYear()
  return `© 2009-${this_year} ${author}`
}
