import { useTranslation } from 'next-i18next'
import { cva } from 'class-variance-authority'

const wrapperVariants = cva('px-5 max-w-screen-md m-auto grid gap-y-4 text-xs mb-20')
const pVariants = cva('')

export const PrivacyPolicy = () => {
  const { t } = useTranslation('common')
  return (
    <div className={wrapperVariants()}>
      <div>
        <h2>{t('Copyrights and Portrait Rights')}</h2>
        <p className={pVariants()}>{t('Copyrights and Portrait Rights P1')}</p>
      </div>
      <div>
        <h2>{t('Personal Information')}</h2>
        <p className={pVariants()}>{t('Personal Information P1')}</p>
      </div>
      <div>
        <h2>{t('Other Disclosures')}</h2>
        <p className={pVariants()}>{t('Other Disclosures P1')}</p>
      </div>
      <div>
        <h2>{t('Contact Form')}</h2>
        <p className={pVariants()}>{t('Contact Form P1')}</p>
        <p className={pVariants()}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://formspree.io/legal/privacy-policy/"
          >
            Formspree Privacy Policy
          </a>
        </p>
      </div>
      <div>
        <h2>{t('Access Analysis')}</h2>
        <p className={pVariants()}>{t('Access Analysis P1')}</p>
        <p className={pVariants()}>
          <a
            href="https://support.google.com/analytics/answer/7318509?hl"
            target="_blank"
            rel="noreferrer"
          >
            {t('Privacy Disclosures Policy')}
          </a>
        </p>
      </div>
      <div>
        <h2>{t('Changes To This Privacy Policy')}</h2>
        <p className={pVariants()}>{t('Changes To This Privacy Policy P1')}</p>
        <p className={pVariants()}>{t('Changes To This Privacy Policy P2')}</p>
        <p className={pVariants()}>{t('Changes To This Privacy Policy P3')}</p>
      </div>
    </div>
  )
}
