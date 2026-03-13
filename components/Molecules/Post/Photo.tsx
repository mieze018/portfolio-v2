import Image from 'next/image'
import Link from 'next/link'
import { cva } from 'libs/component-factory'
import { cn } from 'libs/tw-clsx-util'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { useModalControl } from 'libs/hooks/useModalControl'

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
  const { open } = useModalControl()

  return (
    <Link href="#closeup" scroll={false} className="contents">
      <div
        className={flexClasses({ isColumn })}
        onClick={() => {
          // Why: JSX ではなくデータだけを渡す。
          // Modal 側で Image コンポーネントをレンダリングする責務を持つ。
          open({
            src: photo.original_size.url,
            width: photo.original_size.width,
            height: photo.original_size.height,
            alt: photo.original_size.url,
          })
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
