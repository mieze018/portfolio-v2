// Why: Tailwind CSS v4 では @tailwindcss/postcss が以下を統合している
//   - tailwindcss/nesting (CSS ネスト構文サポート)
//   - tailwindcss (メインプラグイン)
//   - autoprefixer (ベンダープレフィックス自動付与)
// Trade-off: 旧 v3 では 3 プラグインを個別列挙していたが、
//            v4 からは 1 プラグインに集約されシンプルになった
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
