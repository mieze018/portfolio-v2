import i18n from 'i18next'

import { common } from './ja'
const resources = {
  ja: {
    common,
  },
}

i18n.init({
  resources,
  lng: 'ja',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
