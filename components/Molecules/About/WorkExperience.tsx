import { H2, SectionWrapper, UlNest1 } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import { Work } from 'components/Molecules/About/Work'
import type { PageObject } from 'libs/@type/api/notion'
import { getProperties } from 'libs/notion'
import { useTranslation } from 'libs/useTranslation'

export const WorkExperience = ({
  workExperience,
  genres,
}: {
  workExperience: PageObject[]
  genres: PageObject[]
}) => {
  const { tb } = useTranslation('common')
  const workExperienceLabel = tb('workExperience')

  return (
    <SectionWrapper>
      <div>
        <h1>{workExperienceLabel.ja}</h1>
        {workExperienceLabel.en && <div>{workExperienceLabel.en}</div>}
      </div>
      <Separator />
      <ul>
        {genres.map((genre) => (
          <GenreBlock
            key={genre.id}
            genre={genre}
            works={workExperience.filter((work) => {
              // Why: relation が空の場合 getProperties は undefined を返すため optional chaining で安全にアクセス
              const genreRelation = getProperties(work, { name: 'genre', type: 'relation' })
              return genreRelation?.id === genre.id
            })}
          />
        ))}
      </ul>
    </SectionWrapper>
  )
}
const GenreBlock = ({ genre, works }: { genre: PageObject; works: PageObject[] }) => {
  const genreName = getProperties(genre, { name: 'genreName', type: 'title' })
  return (
    <li key={genre}>
      <H2>{genreName}</H2>
      <UlNest1>
        {works.map((work) => {
          return <Work key={work.id} work={work} />
        })}
      </UlNest1>
    </li>
  )
}
