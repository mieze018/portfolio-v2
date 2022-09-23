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
  console.log(fallbackData)
  if (!fallbackData) return <div>Loading...</div>
  return <AboutContent fallbackData={fallbackData} />
}

export default About

export const getStaticProps: GetStaticProps<aboutDataType> = async ({ locale = 'ja' }) => {
  // const page = await getPage(pageId)
  const prizesDB = await getDatabase(prizesDBId)
  const workExperienceDB = await getDatabase(workExperienceDBId)
  const workExperienceGenreDB = await getDatabase(workExperienceGenreDBId)
  const eventDB = await getDatabase(eventDBId)
  const Data = {
    // page: page,
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
