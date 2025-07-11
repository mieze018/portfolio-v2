import type { PageObject } from 'libs/@type/api/notion'

import { ContactContent } from 'components/Organisms/ContactContent'
import { getPage } from 'libs/notion'
import { workAcceptanceStatusDBId } from 'libs/notionDB'

export type contactDataType = {
  fallbackData: {
    workAcceptanceStatus: PageObject[]
  }
}

async function getData() {
  const workAcceptanceStatus = await getPage(workAcceptanceStatusDBId)
  return { workAcceptanceStatus: [workAcceptanceStatus] }
}

export default async function Contact() {
  const fallbackData = await getData()

  if (!fallbackData) return <div>Loading...</div>
  return <ContactContent fallbackData={fallbackData} formId={process.env.NEXT_PUBLIC_FORM || ''} />
}
