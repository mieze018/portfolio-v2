# portfolio-v2

## つかいたいもの

- Next.js <https://nextjs.org/docs>
- TypeScript <https://nextjs.org/docs/basic-features/typescript>
- twin.macro <https://github.com/ben-rogerson/twin.macro>
  - [next-styled-components-typescript](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components-typescript)
  - Tailwind CSS <https://tailwindcss.com/>
  - Styled Components <https://styled-components.com/>
- ESLint <https://eslint.org/docs/latest/>
- Prettier <https://prettier.io/docs/en/>
- Tumblr API <https://www.tumblr.com/docs/en/api/>

## 余裕があればつかいたもの

- Storybook <https://storybook.js.org/docs/react/>
  - [twin.macro Storybook + styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-styled-components-typescript)
- Playwright <https://playwright.dev/docs/intro>

## これができたら別リポジトリでエンジニアポートフォリ作成時にやりたいこと

### サーバサイド候補

#### HeadlessCMS

- WordPress(Headless)
- strapi
- Ghost
- microCMS

### できそうならつかいたいもの

- GraphQL
- WPGraphQL
- Prisma

### デプロイ先候補

- Vercel
- GitHub Pages

## ルールのメモ

### ファイル/ディレクトリ名

`./pages`以下の自動でルーティングしているページにあたるファイルはスネークケース
React コンポーネント(`tsx`)やそれが入っているディレクトリはパスカルケース
メソッドや型(`ts`)その他設定ファイルはキャメルケース

### `./components`

UI コンポーネント

### `./pages/api`

データ配列の定義(?) もっといい呼び方あると思う

### `./libs`

メソッドや型や i18n
