import type { GetStaticProps, NextPage } from 'next'

import { InfoContent } from 'components/Organisms/InfoContent'
import { infoData } from 'pages/api/info'

const Info: NextPage<{ fallbackData: typeof infoData }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <InfoContent data={fallbackData} />
}

export default Info

export const getStaticProps: GetStaticProps = async () => {
  const Data = infoData
  return {
    props: {
      fallbackData: Data,
    },
  }
}
