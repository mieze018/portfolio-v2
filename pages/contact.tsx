import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { PageObject } from 'libs/@type/api/notion'
import type { GetStaticProps, NextPage } from 'next'

import { ContactContent } from 'components/Organisms/ContactContent'
import { getPage } from 'libs/notion'
import { workAcceptanceStatusDBId } from 'libs/notionDB'

export type contactDataType = {
  fallbackData: {
    workAcceptanceStatus: PageObject[]
  }
}
const Contact: NextPage<contactDataType> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <ContactContent fallbackData={fallbackData} />
}

export default Contact

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  const workAcceptanceStatus = await getPage(workAcceptanceStatusDBId)
  const Data = { workAcceptanceStatus }
  return {
    props: {
      fallbackData: Data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
