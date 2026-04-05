/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard', '@dreamsicle.io/stylelint-config-tailwindcss'],
  rules: {
    // Why: Tailwind CSS v4 の @theme ブロックでは、CSS 変数名から自動でユーティリティクラスを生成する際に
    // camelCase が必要な場合がある。そのため custom-property-pattern ルールを無効化する。
    'custom-property-pattern': null,
  },
}

export default stylelintConfig
