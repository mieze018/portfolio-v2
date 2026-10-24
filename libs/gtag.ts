/// <reference types="gtag.js" />

export const initializeAnalytics = (id: string) => {
  if (!id) return () => {}
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args)
    }
  }
  window.gtag('js', new Date())
  const pageView = () => window.gtag('config', id, { page_path: window.location.pathname })
  document.addEventListener('astro:page-load', pageView)
  return () => document.removeEventListener('astro:page-load', pageView)
}
