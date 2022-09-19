import Image from 'next/future/image'
import { useRouter } from 'next/router'

import { Photo } from 'components/Molecules/Post/Photo'

const PhotoCloseUp = () => {
  const router = useRouter()
  type queryType = {
    url: string
    width: number
    height: number
  }
  const { url, width, height }: queryType = router.query
  console.log(router.query)
  if (!url || !width || !height) return <></>
  return <Image src={url} alt={url} height={height} width={width} quality={95} />
}

export default PhotoCloseUp
