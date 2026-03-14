import { PrivacyPolicy } from 'components/Organisms/PrivacyPolicy'
import type { GetStaticProps, NextPage } from 'next'

const Contact: NextPage = () => {
  return <PrivacyPolicy />
}

export default Contact

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
