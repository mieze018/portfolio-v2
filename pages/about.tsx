import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { PageObject } from 'libs/@type/api/notion'
import type { GetStaticProps, NextPage } from 'next'

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

const About: NextPage<aboutDataType> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <AboutContent fallbackData={fallbackData} />
}

export default About

export const getStaticProps: GetStaticProps<aboutDataType> = async ({ locale = 'ja' }) => {
  const prizesDB = await getDatabase(prizesDBId, {
    sortProperty: 'date',
    sortDirection: 'descending',
  })
  const workExperienceDB = await getDatabase(workExperienceDBId)
  const workExperienceGenreDB = await getDatabase(workExperienceGenreDBId, { sortProperty: 'sort' })
  const eventDB = await getDatabase(eventDBId)
  const Data = {
    prizes: prizesDB,
    workExperience: workExperienceDB,
    workExperienceGenre: workExperienceGenreDB,
    events: eventDB,
  }

  return {
    props: {
      fallbackData: Data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
