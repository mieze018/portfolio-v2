import common from 'i18n/ja/common'
import i18n from 'i18next'
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
