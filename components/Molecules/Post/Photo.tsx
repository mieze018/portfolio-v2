import { motion } from 'framer-motion'
import Image from 'next/future/image'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'
/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const FlexItem = styled(motion.div)<{ $isColumn: boolean }>`
  ${tw`w-full`}
  ${({ $isColumn }) => $isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`}
`
export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  const variants = {
    whileInView: {
      opacity: 1,
      filter: 'blur(0px)',
    },
    inactive: {
      opacity: 0.1,
      filter: 'blur(16px)',
    },
  }
  return (
    <>
      <FlexItem
        as={motion.div}
        variants={variants}
        initial="inactive"
        whileInView="whileInView"
        transition={{ delay: 0.25 }}
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
        />
      </FlexItem>
    </>
  )
}
