import '@testing-library/jest-dom/extend-expect'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock t function
export const t = (key: string, params?: any) => {
  if (key === 'key.with.params') {
    return `key.with.params.${params.param}`
  }

  return key
}
// Mock react-i18next
i18n
  .use(initReactI18next).init({
    lng: 'ja',
    fallbackLng: 'ja',

    debug: true,

    resources: {
      ja: {},
      en: {}
    }
  });

jest.mock("next-i18next", () => ({
  ...jest.requireActual("next-i18next"),

  I18nextProvider: jest.fn(),
  __esmodule: true,
  useTranslation: () => {
    return {
      t: (str: string) => str,

      i18n: {
        language: "ja",
        locales: ['ja', 'en'],
        defaultLocale: 'ja',
        addResourceBundle: () => jest.fn(),
        changeLanguage: () => Promise.resolve(),
      },
    };
  },
}));

