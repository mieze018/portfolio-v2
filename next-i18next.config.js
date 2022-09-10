const { initReactI18next } = require('react-i18next')

module.exports = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    localeDetection: false,
  },
  serializeConfig: false,
  use: [initReactI18next],
}
