import { useTranslation } from 'react-i18next'

import type { LocalApi } from 'libs/@type/api/local'

import { H2, Hr, SectionWrapper, UlNest1 } from 'components/Molecules/Info/Atoms'
import { Work } from 'components/Molecules/Info/Work'

export const WorkExperience = ({
  workExperience,
  genres,
}: {
  workExperience: LocalApi.WorkExperience.Work[]
  // genres: LocalApi.WorkExperience.GenreGroup
  genres: string[]
}) => {
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
