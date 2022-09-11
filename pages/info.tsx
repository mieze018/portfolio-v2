import { useTranslation } from 'react-i18next'
import tw from 'twin.macro'

import type { LocalApi } from 'libs/@type/api/local'
import type { GetStaticProps, NextPage } from 'next'

import { Work } from 'components/Molecules/Info/Work'
import { mail } from 'pages/api/basics'
import { infoData } from 'pages/api/info'
import { linktree } from 'pages/api/info/links'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mx-auto gap-y-16`
const P = tw.p``
const SnsLink = tw.a`ml-3 tracking-wider`
const H2 = tw.h2`my-2 leading-loose tracking-widest`

const SectionWrapper = tw.section``
const Hr = tw.hr``
const UlNest1 = tw.ul`grid gap-1 leading-normal tracking-wide`

export const genres = ['文芸書 装画', '文芸誌 扉絵', 'その他']

const Info: NextPage<{ fallbackData: typeof infoData }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <InfoContent data={fallbackData} />
}

export default Info

const InfoContent = ({ data }: { data: typeof infoData }) => {
  const { links, events, workExperience } = data
  return (
    <Wrapper>
      <Introduction />
      {links?.length && <Linktree links={links} />}
      {events?.length && <Events events={events} />}
      {workExperience?.length && <WorkExperience workExperience={workExperience} />}
      <EventHistory events={events} />
      <Prizes />
      <Participant />
    </Wrapper>
  )
}

const Introduction = () => {
  const { t } = useTranslation()
  return (
    <SectionWrapper>
      <P>
        {t('author')}
        <small>{t('author_pronunciation')}</small>
        {t('description')}
      </P>
      <P>
        {t('toMail')}
        <br />
        <a href={`mailto:${mail}`}>{mail}</a>
      </P>
    </SectionWrapper>
  )
}

const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    <h1>
      <a href={linktree.url}>{linktree.text}</a>
    </h1>
    <Hr />
    {links.map((link, linkK) => (
      <P key={linkK}>
        <SnsLink href={link.url}>{link.text}</SnsLink>
      </P>
    ))}
  </SectionWrapper>
)

const WorkExperience = ({ workExperience }: { workExperience: LocalApi.WorkExperience.Work[] }) => {
  const { t } = useTranslation()
  return (
    <SectionWrapper>
      <h1>{t('workExperience')}</h1>
      <Hr />
      <ul>
        {genres.map((genre, genreK) => (
          <li key={genreK} className="">
            <H2>{genre}</H2>
            <UlNest1>
              {workExperience
                .filter((work) => work.genre === genre)
                .map((work, workK) => (
                  <Work key={workK} work={work} />
                ))}
            </UlNest1>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

const Events = ({ events }: { events: LocalApi.Event[] }) => {
  const { t } = useTranslation()
  //日にちが今日以降のものだけを抽出
  const futureEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    return eventDate >= today
  })
  if (!futureEvents.length) return <></>
  return (
    <div className="mt-12">
      <P>{t('eventIncoming')}</P>
      <Hr />
      <ul>
        {futureEvents.map((event, eventK) => (
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
  //日にちが今日以前のものだけを抽出
  const pastEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    return eventDate < today
  })
  return (
    <SectionWrapper>
      <P>{t('eventHistory')}</P>
      <Hr />
      <ul>
        {pastEvents.map((event, eventK) => (
          <li key={eventK}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.place}</p>
            <p>{event.url}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

const Participant = () => (
  <SectionWrapper>
    {/* <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
      Participant of the CGTrader Digital Art Competition
    </a> */}
  </SectionWrapper>
)

const Prizes = () => {
  const { t } = useTranslation()
  return (
    <SectionWrapper>
      {t('awards')}
      <Hr />
      <ul>
        <li>
          <H2> </H2>
          <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
          「山口はるみ賞」及び「鈴木成一賞次点」
        </li>
      </ul>
    </SectionWrapper>
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
