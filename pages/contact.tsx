import type { GetStaticProps, NextPage } from 'next'

import { AboutContent } from 'components/Organisms/AboutContent'
import { aboutData } from 'pages/api/about'

const Contact: NextPage<{ fallbackData: typeof aboutData }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <Contact data={fallbackData} />
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
