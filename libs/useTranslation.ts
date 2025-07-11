// 翻訳データのインポート
// import jaCommon from '../public/locales/ja/common.json'
// import enCommon from '../public/locales/en/common.json'

// 翻訳データの型定義
type TranslationKeys = string

// 翻訳データのマップ
const translations = {
  ja: {
    common: {} as Record<string, string>,
  },
  en: {
    common: {} as Record<string, string>,
  },
} as const

/**
 * 日英併記用のuseTranslationフック
 * 両言語のテキストを返す
 */
export const useTranslation = (namespace: 'common' = 'common') => {
  const getBothLanguages = (key: TranslationKeys) => {
    const ja = translations.ja[namespace][key] || key
    const en = translations.en[namespace][key] || key
    return { ja, en }
  }

  const t = (key: TranslationKeys): string => {
    // デフォルトは日本語を返す（後方互換性のため）
    return translations.ja[namespace][key] || key
  }

  const tb = (key: TranslationKeys) => {
    // tb = translation both（日英両方）
    return getBothLanguages(key)
  }

  return {
    t, // 日本語のみ（既存コードとの互換性）
    tb, // 日英両方
    getBothLanguages, // 明示的な関数名
  }
}
