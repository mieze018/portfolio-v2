import Image from 'next/image'
import tw from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

export const Photo = ({ photo, isColumn }: { photo: Tumblr.Photo; isColumn: boolean }) => (
  <Image
    //TODO:ImageコンポーネントでtailwindCSSのコンパイルできてなさそう
    className={`w-full ${isColumn ? 'basis-1/4 w-1/4 flex-grow shrink mx-0 my-4' : ''}`}
    css={[tw`w-full`, isColumn && tw`flex-grow w-1/4 mx-0 my-4 basis-1/4 shrink`]}
    src={photo.original_size.url}
    alt={photo.original_size.url}
    key={photo.original_size.url}
    height={photo.original_size.height}
    width={photo.original_size.width}
  />
)
