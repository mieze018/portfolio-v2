import { AboutContent } from 'components/Organisms/AboutContent'
import type { LocalApi } from 'libs/@type/api/local'
import type { PageObject } from 'libs/@type/api/notion'
import { getDatabase } from 'libs/notion'
import { eventDBId, prizesDBId, workExperienceDBId, workExperienceGenreDBId } from 'libs/notionDB'
import { getSharedStaticProps } from 'libs/sharedStaticProps'
import type { GetStaticProps, NextPage } from 'next'

export type aboutDataType = {
  socialLinks: LocalApi.SnsLink[]
  fallbackData: {
    prizes: PageObject[]
    workExperience: PageObject[]
    workExperienceGenre: PageObject[]
    events: PageObject[]
  }
}

const About: NextPage<aboutDataType> = ({ socialLinks, fallbackData }: aboutDataType) => {
  if (!fallbackData) return <div>Loading...</div>
  return <AboutContent fallbackData={fallbackData} socialLinks={socialLinks} />
}

export default About

export const getStaticProps: GetStaticProps<aboutDataType> = async () => {
  const shared = await getSharedStaticProps()
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
      ...shared,
      fallbackData: Data,
    },
  }
}
