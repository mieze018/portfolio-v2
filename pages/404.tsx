import { useEffect } from 'libs/reactCompat'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  })

  return null
}
