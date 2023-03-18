import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { hashCloseup } from 'components/Organisms/Modal'
import { modalContentState } from 'libs/states/atoms'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled.div<{ $isColumn: boolean }>`
  ${tw`w-full`}
  ${({ $isColumn }) => $isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`

const ImageElement = styled(Image)<{ photo: Tumblr.Photo; $closeup?: boolean }>`
  ${tw`mx-auto cursor-pointer `}
  ${({ $closeup }) => ($closeup ? tw`max-w-none` : tw`max-w-full`)}
`
export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  const setModalContent = useSetAtom(modalContentState)
  const lightCyan =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjePD//38ACX8D3nikQTQAAAAASUVORK5CYII='
  return (
    <Link href={`#${hashCloseup}`} scroll={false} className="contents">
      <FlexItem
        $isColumn={isColumn}
        onClick={() => {
          setModalContent(
            <ImageElement
              src={photo.original_size.url}
              alt={photo.original_size.url}
              key={photo.original_size.url}
              height={photo.original_size.height}
              width={photo.original_size.width}
              photo={photo}
              $closeup
              placeholder="blur"
              blurDataURL={lightCyan}
            />
          )
        }}
      >
        <ImageElement
          src={photo.original_size.url}
          alt={photo.original_size.url}
          key={photo.original_size.url}
          height={photo.original_size.height}
          width={photo.original_size.width}
          photo={photo}
        />
      </FlexItem>
    </Link>
  )
}
