import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetStaticProps, NextPage } from 'next'

import { PrivacyPolicy } from 'components/Organisms/PrivacyPolicy'

const Contact: NextPage = () => {
  return <PrivacyPolicy />
}

export default Contact

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
