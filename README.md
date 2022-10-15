# portfolio-v2

## 使っているもの
https://github.com/mieze018/portfolio-v2/network/dependencies

### フレームワーク(? なんと呼ぶのが正しいのか調べる)

- React <https://ja.reactjs.org/>
- Next.js <https://nextjs.org/docs>
- TypeScript <https://nextjs.org/docs/basic-features/typescript>

### フレームワークのためのライブラリ

- Recoil <https://recoiljs.org/>
- next-i18next <https://github.com/i18next/next-i18next>

### スタイル, UI のためのライブラリ

- twin.macro <https://github.com/ben-rogerson/twin.macro>
  - [next-styled-components-typescript](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components-typescript)
  - Tailwind CSS <https://tailwindcss.com/>
    - Tailwind CSS with Next.js <https://tailwindcss.com/docs/guides/nextjs>
    - Scrollbar Plugin for Tailwind CSS <https://github.com/adoxography/tailwind-scrollbar> overflow:overlay が不都合なのでオミット
  - Styled Components <https://styled-components.com/>
- Headless UI <https://headlessui.com/>
- Radix UI <https://www.radix-ui.com/docs/primitives/overview/introduction>
- React Icons - <https://react-icons.github.io/react-icons/>
- next-useragent<https://github.com/tokuda109/next-useragent>

### スタイルのための資料

- W3C color names <https://www.w3schools.com/colors/colors_names.asp>
- Color Name Finder <https://colors.artyclick.com/color-name-finder/>

#### アニメーション

- Framer Motion <https://www.framer.com/motion/>
  - ease <https://www.framer.com/docs/transition/###ease>

### なんと呼ぶのか調べる

- ESLint <https://eslint.org/docs/latest/>
- Prettier <https://prettier.io/docs/en/>
- ts-unused-exports <https://github.com/pzavolinsky/ts-unused-exports>

### サーバとのやりとり

- Tumblr API <https://www.tumblr.com/docs/en/api/>
- Notion API <https://developers.notion.com/>
- SWR <https://swr.vercel.app/>

### メールフォーム

- Formspree <https://formspree.io/>
  - <https://vercel.com/integrations/formspree>

## つかいたいもの

## 余裕があればつかいたもの

- Storybook <https://storybook.js.org/docs/react/>
  - [twin.macro Storybook + styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-styled-components-typescript)
- Playwright <https://playwright.dev/docs/intro>

- Linktree-API <https://documenter.getpostman.com/view/14039622/Tzsik4P8>
  - リンクの二重管理しなくていいかも
- .env
  - 今回表示だけで非公開にする情報はないけど勉強のためにあとで Tumblr の API キーをサーバでも設定したい

### DB の勉強のために仕事の経歴をサーバに置いて投稿できるようにする

- Prisma?
  - Prisma Github <https://github.com/prisma/prisma>
- Heroku?
- Firebase?
- Upstash? <https://vercel.com/integrations/upstash>

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
TODO:教訓：後から大文字小文字を変更するとローカルでは認識されてもサーバで認識されないとか色々大変になるので要注意
一度親ディレクトリごとリネーム -> 中身のリネームし -> 親の名前戻す するとよい
```

- `./pages`以下の自動でルーティングしているページにあたるファイルはスネークケース(url のパスに準じる)
- React コンポーネント(`tsx`)やそれが入っているディレクトリはパスカルケース
- メソッドや型(`ts`)その他設定ファイルはキャメルケース

### `./components`

UI コンポーネント

### `./pages/api`

- データ配列の定義(?) もっといい呼び方あると思う
- 学んだこと! 型定義で`type`じゃなくて`interface`使う時って json のデータに型つけたい時？多分

### `./libs`

- メソッドや型や i18n

## 教訓メモ

TODO:あとでまとめて Zenn の記事書くぞがんばるぞ

### アニメーション

- 再レンダリングすると描写がリセットされる、トランジションも効かなくなる
  - <del> prop を渡さない </del> 親要素があるとダメ？？？Wrapper があるとだめだな・・
  - Framer Motion でどうにかできるか？
- アニメーションで指定されているスタイルはそうでないスタイルより強い
- <del> 長さの単位は揃えないとトランジションしない</del>

#### アニメーションと Styled Components

- 複数のアニメーションをさせる場合 1 つの`animation`プロパティ内で全て指定しないといけないのでプロパティを上書きすると後のしか残らない
- DOM の出現からずっと継続させたいアニメーションは、クラス再生成するとその都度リセットされるのでそういう場合はアニメーションの CSS だけ他の動的なスタイルと別クラスで指定して再生成されないようにする

