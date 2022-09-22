import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetStaticProps, NextPage } from 'next'

import { ContactContent } from 'components/Organisms/ContactContent'

const Contact: NextPage = () => {
  return <ContactContent />
}

export default Contact

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
