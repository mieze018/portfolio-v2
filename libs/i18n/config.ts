import i18n from 'i18next'
import common from 'libs/i18n/ja/common'
import { initReactI18next } from 'react-i18next'


const resources = {
  ja: {
    translation: {
      ...common,
    }
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
