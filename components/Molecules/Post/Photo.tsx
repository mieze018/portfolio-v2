import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { cva } from 'libs/component-factory'
import { cn } from 'libs/tw-clsx-util'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { hashCloseup } from 'components/Organisms/Modal'
import { modalContentState } from 'libs/states/atoms'

/** 画像に直接スタイル指定せずラッパーにflex-itemのCSSをかける */
const flexClasses = cva('w-full', {
  variants: {
    isColumn: {
      true: 'grow w-1/4 mx-0 my-4 basis-1/4 shrink',
      false: '',
    },
  },
  defaultVariants: {
    isColumn: false,
  },
})

// Next.js Imageは特殊なので直接cvaで定義
const imageVariants = cva('mx-auto cursor-pointer', {
  variants: {
    closeup: {
      true: 'max-w-none',
      false: 'max-w-full',
    },
  },
  defaultVariants: {
    closeup: false,
  },
})

export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => {
  const setModalContent = useSetAtom(modalContentState)
  const lightCyan =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjePD//38ACX8D3nikQTQAAAAASUVORK5CYII='
  return (
    <Link href={`#${hashCloseup}`} scroll={false} className="contents">
      <div
        className={flexClasses({ isColumn })}
        onClick={() => {
          setModalContent(
            <Image
              src={photo.original_size.url}
              alt={photo.original_size.url}
              key={photo.original_size.url}
              height={photo.original_size.height}
              width={photo.original_size.width}
              className={cn(imageVariants({ closeup: true }))}
              placeholder="blur"
              blurDataURL={lightCyan}
            />
          )
        }}
      >
        <Image
          src={photo.original_size.url}
          alt={photo.original_size.url}
          key={photo.original_size.url}
          height={photo.original_size.height}
          width={photo.original_size.width}
          className={cn(imageVariants({ closeup: false }))}
        />
      </div>
    </Link>
  )
}
