import React from 'react'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photo } from 'components/Molecules/Post/Photo'

export const Photos = ({
  photos,
  isShowOnlyLastPhoto,
  isColumn,
}: {
  photos: Tumblr.Photo[]
  isShowOnlyLastPhoto: boolean
  isColumn: boolean
}) => {
  return (
    <>
      {photos.map((photo, i) => {
        const isLastPhoto = i === photos.length - 1
        //最後の画像だけ表示するタグがついている場合、最後の画像でなければスキップ
        if (isShowOnlyLastPhoto && !isLastPhoto)
          return <React.Fragment key={photo.original_size.url}></React.Fragment>
        return <Photo key={photo.original_size.url} photo={photo} isColumn={isColumn} />
      })}
    </>
  )
}
