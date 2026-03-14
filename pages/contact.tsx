import { ContactContent } from 'components/Organisms/ContactContent'
import type { PageObject } from 'libs/@type/api/notion'
import { getPage } from 'libs/notion'
import { workAcceptanceStatusDBId } from 'libs/notionDB'
import type { GetStaticProps, NextPage } from 'next'

export type contactDataType = {
  fallbackData: {
    workAcceptanceStatus: PageObject[]
  }
}
const Contact: NextPage<contactDataType> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <ContactContent fallbackData={fallbackData} formId={process.env.NEXT_PUBLIC_FORM || ''} />
}

export default Contact

export const getStaticProps: GetStaticProps = async () => {
  const workAcceptanceStatus = await getPage(workAcceptanceStatusDBId)
  const Data = { workAcceptanceStatus }
  return {
    props: {
      fallbackData: Data,
    },
  }
}
