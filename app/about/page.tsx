import type { PageObject } from 'libs/@type/api/notion'

import { AboutContent } from 'components/Organisms/AboutContent'
import { getDatabase } from 'libs/notion'
import { prizesDBId, workExperienceDBId, workExperienceGenreDBId, eventDBId } from 'libs/notionDB'

export type aboutDataType = {
  fallbackData: {
    prizes: PageObject[]
    workExperience: PageObject[]
    workExperienceGenre: PageObject[]
    events: PageObject[]
  }
}

async function getData() {
  const prizesDB = await getDatabase(prizesDBId, {
    sortProperty: 'date',
  })
  const workExperienceDB = await getDatabase(workExperienceDBId, {
    sortProperty: 'date',
  })
  const workExperienceGenreDB = await getDatabase(workExperienceGenreDBId, {
    sortProperty: 'sort',
    sortDirection: 'ascending',
  })
  const eventDB = await getDatabase(eventDBId)

  return {
    prizes: prizesDB,
    workExperience: workExperienceDB,
    workExperienceGenre: workExperienceGenreDB,
    events: eventDB,
  }
}

export default async function About() {
  const fallbackData = await getData()

  if (!fallbackData) return <div>Loading...</div>
  return <AboutContent fallbackData={fallbackData} />
}
