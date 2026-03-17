import { PrivacyPolicy } from 'components/Organisms/PrivacyPolicy'
import { getSharedStaticProps } from 'libs/sharedStaticProps'
import type { GetStaticProps, NextPage } from 'next'

const Contact: NextPage = () => {
  return <PrivacyPolicy />
}

export default Contact

export const getStaticProps: GetStaticProps = async () => {
  const shared = await getSharedStaticProps()
  return {
    props: {
      ...shared,
    },
  }
}
