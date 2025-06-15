import { useTranslation } from 'libs/useTranslation'
import { tw, cva, twe } from 'libs/component-factory'
import { P, SectionWrapper } from 'components/Atoms/About/Atoms'

export const Introduction = () => {
  const { tb } = useTranslation('common')
  const author = tb('author')
  const authorPronunciation = tb('author_pronunciation')
  const description = tb('description')

  const Wrapper = twe(P, cva('space-y-1 flex flex-col'))
  const Line = tw('div', cva('flex items-center gap-x-4'))
  return (
    <SectionWrapper>
      <Wrapper>
        {author.ja && description.ja && authorPronunciation.ja && (
          <Line>
            <div data-testid="author">{author.ja}</div>
            <div>{authorPronunciation.ja}</div>
            <div>{description.ja}</div>
          </Line>
        )}
        {author.en && description.en && (
          <Line>
            <div data-testid="author">{author.en}</div>
            <div>{description.en}</div>
          </Line>
        )}
      </Wrapper>
    </SectionWrapper>
  )
}
