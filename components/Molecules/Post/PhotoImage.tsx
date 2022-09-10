import Image from 'next/image'

import type { Tumblr } from 'libs/@type/tumblr'

export const PhotoImage = ({
  photo,
  showOnlyLastPhoto,
  lastPhoto,
}: {
  photo: Tumblr.Photo
  showOnlyLastPhoto: boolean
  lastPhoto: boolean
}) => {
  //最後の画像だけ表示するタグがついている場合、最後の画像でなければスキップ
  if (showOnlyLastPhoto && lastPhoto) return <></>
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
