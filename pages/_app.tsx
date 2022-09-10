import 'libs/i18n/config'

import type { AppProps } from 'next/app'
import '../styles/global.css'
import './index.css'
import '../components/Molecules/TopBar.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
