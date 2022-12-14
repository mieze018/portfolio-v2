import { useTranslation } from 'next-i18next'
import tw from 'twin.macro'

const Wrapper = tw.div`px-5 max-w-screen-md m-auto grid gap-y-4 text-xs mb-20`
const P = tw.p``

export const PrivacyPolicy = () => {
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <div>
        <h2>{t('Copyrights and Portrait Rights')}</h2>
        <P>{t('Copyrights and Portrait Rights P1')}</P>
      </div>
      <div>
        <h2>{t('Personal Information')}</h2>
        <P>{t('Personal Information P1')}</P>
      </div>
      <div>
        <h2>{t('Other Disclosures')}</h2>
        <P>{t('Other Disclosures P1')}</P>
      </div>
      <div>
        <h2>{t('Contact Form')}</h2>
        <P>{t('Contact Form P1')}</P>
        <P>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://formspree.io/legal/privacy-policy/"
          >
            Formspree Privacy Policy
          </a>
        </P>
      </div>
      <div>
        <h2>{t('Access Analysis')}</h2>
        <P>{t('Access Analysis P1')}</P>
        <P>
          <a
            href="https://support.google.com/analytics/answer/7318509?hl"
            target="_blank"
            rel="noreferrer"
          >
            {t('Privacy Disclosures Policy')}
          </a>
        </P>
      </div>
      <div>
        <h2>{t('Changes To This Privacy Policy')}</h2>
        <P>{t('Changes To This Privacy Policy P1')}</P>
        <P>{t('Changes To This Privacy Policy P2')}</P>
        <P>{t('Changes To This Privacy Policy P3')}</P>
      </div>
    </Wrapper>
  )
}
