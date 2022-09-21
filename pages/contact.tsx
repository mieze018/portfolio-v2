import type { GetStaticProps, NextPage } from 'next'

import { ContactContent } from 'components/Organisms/Contact'
import { aboutData } from 'pages/api/about'

const Contact: NextPage<{ fallbackData: typeof aboutData }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <ContactContent data={fallbackData} />
}

export default Contact

export const getStaticProps: GetStaticProps = async () => {
  const Data = aboutData
  return {
    props: {
      fallbackData: Data,
    },
  }
}
