import Image from 'next/image'
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

  const handleOpenPhoto = () => {
    open({
      src: photo.original_size.url,
      width: photo.original_size.width,
      height: photo.original_size.height,
      alt: photo.original_size.url,
    })
  }

  return (
    // Why: 以前は <Link href="#closeup"> でハッシュ遷移していたが、
    // useModalControl.open() が setHash('closeup') を内部で行うため、
    // <Link> と open() の二重ナビゲーションが発生し "Cancel rendering route" エラーになっていた。
    // open() にハッシュ管理を一本化し、<Link> を除去。
    <button
      type="button"
      className={cn(
        flexClasses({ isColumn }),
        'appearance-none border-none bg-transparent p-0 block'
      )}
      aria-label={`写真を拡大表示: ${photo.caption || '画像'}`}
      onClick={handleOpenPhoto}
    >
      <Image
        src={photo.original_size.url}
        alt={photo.original_size.url}
        key={photo.original_size.url}
        height={photo.original_size.height}
        width={photo.original_size.width}
        className={cn(imageVariants({ closeup: false }))}
      />
    </button>
  )
}
