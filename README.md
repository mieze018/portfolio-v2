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

### DB の勉強のために仕事の経歴をサーバに置いて投稿できるようにする

- Prisma?
  - Prisma Github <https://github.com/prisma/prisma>
- Heroku?
- Firebase?

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

```text
教訓：後から大文字小文字を変更するとローカルでは認識されてもサーバで認識されないとか色々大変になるので要注意
一度親ディレクトリごとリネーム -> 中身のリネームし -> 親の名前戻す するとよい
```

- `./pages`以下の自動でルーティングしているページにあたるファイルはスネークケース
- React コンポーネント(`tsx`)やそれが入っているディレクトリはパスカルケース
- メソッドや型(`ts`)その他設定ファイルはキャメルケース

### `./components`

UI コンポーネント

### `./pages/api`

データ配列の定義(?) もっといい呼び方あると思う
学んだこと! 型定義で`type`じゃなくて`interface`使う時って json のデータに型つけたい時？多分

### `./libs`

メソッドや型や i18n
