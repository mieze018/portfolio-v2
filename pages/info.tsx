import { Footer } from 'components/atoms/footer'
import { Work } from 'components/atoms/Work'
import { Events, links, workExperience } from 'components/molecules/infoData'
import { NextPage } from 'next'
// import { Genres } from 'pages/@type/work'
import { useTranslation } from 'react-i18next'
import tw from 'twin.macro'

const Wrapper = tw.div`px-5 text-xs leading-7 text-center md:text-sm`

const Info: NextPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Wrapper>
        <div id="workExperience" className="mt-12 text-left Japanese">
          <p>
            {t('author')}
            <small>{t('author_pronunciation')}</small>
            {t('description')}
          </p>
          <p>
            {t('toMail')}
            <br />
            <a href={`mailto:${process.env.NEXT_PUBLIC_mail}`}>
              {process.env.NEXT_PUBLIC_mail}
            </a>
          </p>
          <div className="mt-16">
            <h1 className="">
              <a href={process.env.NEXT_PUBLIC_linktree}>{t('linktree')}</a>
            </h1>
            <hr />
            {links.map((link, linkK) => (
              <p key={linkK}>
                <a
                  href={link.url}
                  className={`${link.class && link.class} ml-3 tracking-wider`}
                >
                  {link.text}
                </a>
              </p>
            ))}
          </div>

          {Events.length > 0 && (
            <p>
              {t('eventIncoming')}
              <hr />
            </p>
          )}

          <div className="mt-16">
            <h1 className="">{t('workExperience')}</h1>
            <hr />
            <ul>
              {/* {Genres.map((genre, genreK) => (
                <li key={genreK} className="">
                  <h2 className="my-2 leading-loose tracking-widest">
                    {genre}
                  </h2>
                  <ul className="leading-normal tracking-wide">
                    {workExperience
                      .filter((work) => work.gジャンル === genre)
                      .map((work, workK) => (
                        <Work key={workK} work={work} />
                      ))}
                  </ul>
                </li>
              ))} */}
            </ul>
          </div>

          {/* <p className="mt20">
          展示
          <hr />
          <ul>
            <li>
              2016
              <ul>
                <li>
                  <i></i>CANCAN exhibition at LemoArt Gallery (Berlin, Germany)
                </li>
                <li>
                  <i></i>Digital Creator 23人展「恋」 at アートスペースリビーナ
                  (Tokyo, Japan)
                </li>
              </ul>
            </li>
          </ul>
        </p> */}

          <div className="my-12">
            {t('awards')}
            <hr />
            <ul>
              <li>
                <h2 className="my-2 leading-loose tracking-widest"> </h2>
                <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
                「山口はるみ賞」及び「鈴木成一賞次点」
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="mt20">
        <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
          Participant of the CGTrader Digital Art Competition
        </a>
      </div> */}
      </Wrapper>
      <Footer />
    </>
  )
}

export default Info
