import { SectionWrapper, UlNest1 } from 'components/Atoms/About/Atoms'
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
      <h1>
        <p>{workExperienceLabel.en}</p>
        <p>{workExperienceLabel.ja}</p>
      </h1>

      <Separator className="mb-4" />
      <UlNest1>
        {workExperience.map((work) => {
          const genreRelation = getProperties(work, { name: 'genre', type: 'relation' })
          const genre = genres.find((g) => g.id === genreRelation?.id)
          const genreName = genre
            ? getProperties(genre, { name: 'genreName', type: 'title' })
            : null
          return <Work key={work.id} work={work} genreName={genreName} />
        })}
      </UlNest1>
    </SectionWrapper>
  )
}
