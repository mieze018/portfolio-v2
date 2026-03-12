import { useTranslation } from 'libs/useTranslation'
import { tw, cva } from 'libs/component-factory'

const Wrapper = tw('div', cva('px-5 max-w-(--breakpoint-md) m-auto grid gap-y-4 text-xs mb-20'))
const P = tw('p', cva(''))

export const PrivacyPolicy = () => {
  return (
    <>
      <SwitchLang lang="ja" />
      <SwitchLang lang="en" />
    </>
  )
}

const SwitchLang = ({ lang }: { lang: 'ja' | 'en' }) => {
  const { tb } = useTranslation('common')
  return (
    <Wrapper>
      <div>
        <h2>{tb('Copyrights and Portrait Rights')[lang]}</h2>
        <P>{tb('Copyrights and Portrait Rights P1')[lang]}</P>
      </div>
      <div>
        <h2>{tb('Personal Information')[lang]}</h2>
        <P>{tb('Personal Information P1')[lang]}</P>
      </div>
      <div>
        <h2>{tb('Other Disclosures')[lang]}</h2>
        <P>{tb('Other Disclosures P1')[lang]}</P>
      </div>
      <div>
        <h2>{tb('Contact Form')[lang]}</h2>
        <P>{tb('Contact Form P1')[lang]}</P>
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
        <h2>{tb('Access Analysis')[lang]}</h2>
        <P>{tb('Access Analysis P1')[lang]}</P>
        <P>
          <a
            href="https://support.google.com/analytics/answer/7318509?hl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tb('Privacy Disclosures Policy')[lang]}
          </a>
        </P>
      </div>
      <div>
        <h2>{tb('Changes To This Privacy Policy')[lang]}</h2>
        <P>{tb('Changes To This Privacy Policy P1')[lang]}</P>
        <P>{tb('Changes To This Privacy Policy P2')[lang]}</P>
        <P>{tb('Changes To This Privacy Policy P3')[lang]}</P>
      </div>
    </Wrapper>
  )
}
