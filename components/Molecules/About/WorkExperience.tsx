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
      <div>
        <h1>{workExperienceLabel.ja}</h1>
        {workExperienceLabel.en && <div>{workExperienceLabel.en}</div>}
      </div>
      <Separator />
      <UlNest1>
        {workExperience.map((work) => {
          // Why: relation から対応するジャンル名を解決して各アイテムの先頭に表示する
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
