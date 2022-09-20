import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

type ContactEvent = {
  action: 'submit_form'
  category: 'contact'
  label: string
}

type ClickEvent = {
  action: 'click'
  category: 'other'
  label: string
}

export type Event = ContactEvent | ClickEvent
// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageView = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}
// GAイベントを発火させる
export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}

/**ページ移管時にカウントする */
export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) return

    const handleRouteChange = (path: string) => {
      pageView(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
/** gtag.jsを読み込む */
export const GoogleAnalytics = () => (
  <>
    {existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" defer strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
        </Script>
      </>
    )}
  </>
)
