import Image from 'next/future/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled.div<{ $isColumn: boolean }>`
  ${tw`w-full`}
  ${({ $isColumn }) => $isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`
export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const setModalContent = useSetRecoilState(modalContentState)
  const ImageElement = styled(Image).attrs({
    src: photo.original_size.url,
    alt: photo.original_size.url,
    key: photo.original_size.url,
    height: photo.original_size.height,
    width: photo.original_size.width,
  })<{ $closeup?: boolean }>`
    ${tw`mx-auto cursor-pointer `}
    ${({ $closeup }) => ($closeup ? tw`max-w-none` : tw`max-w-full`)}
  `

  return (
    <>
      <FlexItem
        $isColumn={isColumn}
        onClick={() => {
          setIsModalOpen(!isModalOpen)
          setModalContent(
            <ImageElement
              $closeup
              quality={95}
              // placeholder="blur"
              // blurDataURL={photo.alt_sizes.find((size) => size.width === 100)?.url}
            />
          )
        }}
      >
        <ImageElement />
      </FlexItem>
    </>
  )
}
