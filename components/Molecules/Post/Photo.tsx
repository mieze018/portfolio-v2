import Image from 'next/image'

import type { Tumblr } from 'libs/@type/api/tumblr'

export const Photo = ({
  photo,
  isShowOnlyLastPhoto,
  isLastPhoto,
}: {
  photo: Tumblr.Photo
  isShowOnlyLastPhoto: boolean
  isLastPhoto: boolean
}) => {
  //最後の画像だけ表示するタグがついている場合、最後の画像でなければスキップ
  if (isShowOnlyLastPhoto && isLastPhoto) return <></>
  return (
    <Image
      className="w-full"
      src={photo.original_size.url}
      alt={photo.original_size.url}
      key={photo.original_size.url}
      height={photo.original_size.height}
      width={photo.original_size.width}
    />
  )
}
