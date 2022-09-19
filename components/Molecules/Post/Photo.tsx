import Image from 'next/future/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'
import type { Dispatch, SetStateAction } from 'react'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled.div<{ $isColumn: boolean }>`
  ${tw`w-full`}
  ${({ $isColumn }) => $isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`
export const Photo = ({
  photo,
  isColumn,
  isFocusing,
  setIsFocusing,
}: {
  photo: Tumblr.Photo
  isColumn: boolean
  isFocusing: boolean
  setIsFocusing: Dispatch<SetStateAction<boolean>>
}) => {
  const [clickedImage, setClickedImage] = useState<HTMLImageElement | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const anchorId = `photo-${photo.original_size.url.slice(-15)}`
  const handleFocus = (e) => {
    setIsFocusing(!isFocusing)
    // setClickedImage(e.target)
  }
  useEffect(() => {
    //パスに#が含まれていたらフォーカスしてスクロール
    if (window.location.hash === `#${anchorId}`) {
      setIsFocusing(true)
      // ref.current?.scrollIntoView(true)

      clickedImage?.scrollIntoView({ block: 'center', inline: 'center' })
    } else {
      setIsFocusing(false)
    }
  }, [clickedImage, isFocusing])
  return (
    <Link href={`#${anchorId}`} scroll={false} shallow={true} onClick={(e) => handleFocus(e)}>
      <FlexItem
        id={anchorId}
        ref={ref}
        $isColumn={isColumn}
        css={[
          tw`m-auto`,
          isFocusing && ref.current === clickedImage
            ? tw`max-w-none cursor-zoom-out`
            : tw`cursor-zoom-in`,
        ]}
      >
        <Image
          src={photo.original_size.url}
          alt={photo.original_size.url}
          key={photo.original_size.url}
          height={photo.original_size.height}
          width={photo.original_size.width}
          //image/next
          quality={85}
          // placeholder="blur"
          // blurDataURL={photo.alt_sizes.find((size) => size.width === 100)?.url}
          css={tw`mx-auto`}
        />
      </FlexItem>
    </Link>
  )
}
