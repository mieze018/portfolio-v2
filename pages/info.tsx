import { useTranslation } from 'react-i18next'
import tw from 'twin.macro'

import type { LocalApi } from 'libs/@type/api/local'
import type { GetStaticProps, NextPage } from 'next'

import { Footer } from 'components/Molecules/Footer'
import { Work } from 'components/Molecules/Info/Work'
import { TopBar } from 'components/Molecules/TopBar'
import { infoData } from 'pages/api/info'

const Wrapper = tw.div`px-5 text-xs leading-7 text-center md:text-sm`
const P = tw.p``
const LinktreeWrapper = tw.div`mt-16`
const SnsLink = tw.a`ml-3 tracking-wider`
const H2 = tw.h2`my-2 leading-loose tracking-widest`

export const genres = ['文芸書 装画', '文芸誌 扉絵', 'その他']

const Info: NextPage<{ fallbackData: typeof infoData }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return (
    <>
      <TopBar />
      <InfoContent data={fallbackData} />
      <Footer />
    </>
  )
}

export default Info

const InfoContent = ({ data }: { data: typeof infoData }) => {
  const { links, events, workExperience } = data
  return (
    <Wrapper>
      <div id="workExperience" className="mt-12 text-left Japanese">
        <Introduction />
        {links?.length && <Linktree links={links} />}
        {events?.length && <Events events={events} />}
        {workExperience?.length && <WorkExperience workExperience={workExperience} />}
        <EventHistory events={events} />
        <Awards />
      </div>
      <Participant />
    </Wrapper>
  )
}

const Introduction = () => {
  const { t } = useTranslation()
  return (
    <>
      <P>
        {t('author')}
        <small>{t('author_pronunciation')}</small>
        {t('description')}
      </P>
      <P>
        {t('toMail')}
        <br />
        <a href={`mailto:${process.env.NEXT_PUBLIC_mail}`}>{process.env.NEXT_PUBLIC_mail}</a>
      </P>
    </>
  )
}

const Linktree = ({ links }: { links: any[] }) => {
  const { t } = useTranslation()
  return (
    <LinktreeWrapper>
      <h1>
        <a href={process.env.NEXT_PUBLIC_linktree}>{t('linktree')}</a>
      </h1>
      <hr />
      {links.map((link, linkK) => (
        <P key={linkK}>
          <SnsLink href={link.url} className={`${link.class && link.class}`}>
            {link.text}
          </SnsLink>
        </P>
      ))}
    </LinktreeWrapper>
  )
}

const WorkExperience = ({ workExperience }: { workExperience: LocalApi.WorkExperience.Work[] }) => {
  const { t } = useTranslation()
  return (
    <div className="mt-16">
      <h1 className="">{t('workExperience')}</h1>
      <hr />
      <ul>
        {genres.map((genre, genreK) => (
          <li key={genreK} className="">
            <H2>{genre}</H2>
            <ul className="leading-normal tracking-wide">
              {workExperience
                .filter((work) => work.genre === genre)
                .map((work, workK) => (
                  <Work key={workK} work={work} />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Events = ({ events }: { events: LocalApi.Event[] }) => {
  const { t } = useTranslation()
  return (
    <div className="mt-12">
      <P>{t('eventIncoming')}</P>
      <hr />
      <ul>
        {events.map((event, eventK) => (
          <li key={eventK}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.place}</p>
            <p>{event.url}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const EventHistory = ({ events }: { events: LocalApi.Event[] }) => {
  const { t } = useTranslation()
  return (
    <div className="mt-12">
      <P>{t('eventHistory')}</P>
      <hr />
      <ul>
        {events.map((event, eventK) => (
          <li key={eventK}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.place}</p>
            <p>{event.url}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Participant = () => (
  <div className="mt20">
    {/* <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
      Participant of the CGTrader Digital Art Competition
    </a> */}
  </div>
)

const Awards = () => {
  const { t } = useTranslation()
  return (
    <div className="my-12">
      {t('awards')}
      <hr />
      <ul>
        <li>
          <H2> </H2>
          <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
          「山口はるみ賞」及び「鈴木成一賞次点」
        </li>
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const Data = infoData
  return {
    props: {
      fallbackData: Data,
    },
  }
}
