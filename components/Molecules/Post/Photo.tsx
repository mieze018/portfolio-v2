import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/future/image'
import { useState } from 'react'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled(motion.div)<{ $isColumn: boolean }>`
  ${tw`w-full snap-center`}
  ${({ $isColumn }) => $isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`
export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  const [ready, setReady] = useState<string>('')

  return (
    <AnimatePresence mode="wait">
      <FlexItem
        as={motion.div}
        key={ready}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        $isColumn={isColumn}
      >
        <Image
          className="m-auto"
          src={photo.original_size.url}
          alt={photo.original_size.url}
          key={photo.original_size.url}
          height={photo.original_size.height}
          width={photo.original_size.width}
          //image/next
          quality={85}
          // placeholder="blur"
          // blurDataURL={photo.alt_sizes.find((size) => size.width === 100)?.url}
          onLoad={() => setReady(photo.original_size.url)}
        />
      </FlexItem>
    </AnimatePresence>
  )
}
