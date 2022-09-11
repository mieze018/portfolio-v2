import Image from 'next/image'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled.div<{ isColumn: boolean }>`
  ${tw`w-full`}
  ${({ isColumn }) => isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`
export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  return (
    <FlexItem isColumn={isColumn}>
      <Image
        //TODO:ImageコンポーネントでtailwindCSSのコンパイルできてなさそう
        // style={style}
        src={photo.original_size.url}
        alt={photo.original_size.url}
        key={photo.original_size.url}
        height={photo.original_size.height}
        width={photo.original_size.width}
        //image/next
        quality={85}
        placeholder="blur"
        blurDataURL={photo.alt_sizes.find((size) => size.width === 100)?.url}
        lazyBoundary="2000px"
      />
    </FlexItem>
  )
}
