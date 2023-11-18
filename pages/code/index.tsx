import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { PageObject } from 'libs/@type/api/notion'
import type { GetStaticProps, NextPage } from 'next'

import { EngineerContent } from 'components/Organisms/EngineerContent'
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

const EngineerPortfolio: NextPage<aboutDataType> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <EngineerContent fallbackData={fallbackData} />
}

export default EngineerPortfolio

export const getStaticProps: GetStaticProps<aboutDataType> = async ({ locale = 'ja' }) => {
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
