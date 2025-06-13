import { useTranslation } from 'libs/useTranslation'

import { SectionWrapper, P } from 'components/Atoms/About/Atoms'

export const Introduction = () => {
  const { tb } = useTranslation('common')
  const author = tb('author')
  const authorPronunciation = tb('author_pronunciation')
  const description = tb('description')

  return (
    <SectionWrapper>
      <P className="space-y-1">
        {author.ja && description.ja && authorPronunciation.ja && (
          <div>
            <span data-testid="author">{author.ja}</span>
            <small className="ml-2 mr-2">{authorPronunciation.ja}</small>
            {description.ja}
          </div>
        )}
        {author.en && description.en && (
          <div>
            <span data-testid="author" className="mr-2">
              {author.en}
            </span>
            {description.en}
          </div>
        )}
      </P>
    </SectionWrapper>
  )
}
