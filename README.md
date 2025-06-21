# portfolio v2

## セットアップ

1. voltaをインストール <https://volta.sh/>
2. nodeとyarnをvoltaでインストール
3. `yarn install`で依存関係をインストール
4. `vercel CLI`をインストール
5. `vercel link`でプロジェクトをvercelに紐付ける
6. `vercel env pull`で環境変数をローカルにダウンロード
7. `yarn dev`で開発サーバーを起動

## 使っているもの

<https://github.com/mieze018/portfolio-v2/network/dependencies>

### 開発環境 (Dev Environments)

- React <https://ja.reactjs.org/>
- Next.js <https://nextjs.org/docs>

#### ツール

- ~~Recoil <https://recoiljs.org/>~~
- Jotai <http://jotai.org/>
- next-i18next <https://github.com/i18next/next-i18next>

### Compiling

- TypeScript <https://nextjs.org/docs/basic-features/typescript>

### スタイル, UI のためのライブラリ

- **class-variance-authority (cva)** <https://cva.style/docs>
  - バリアントベースのクラス管理
- **独自tw関数** (`libs/component-factory.tsx`)
  - CVAとforwardRefを組み合わせた型安全なコンポーネントファクトリー
- **Tailwind CSS** <https://tailwindcss.com/>
  - Tailwind CSS with Next.js <https://tailwindcss.com/docs/guides/nextjs>
  - tailwind-merge <https://github.com/dcastil/tailwind-merge> (clsx統合)
- **Headless UI** <https://headlessui.com/>
- **Radix UI** <https://www.radix-ui.com/docs/primitives/overview/introduction>
- **React Icons** - <https://react-icons.github.io/react-icons/>

- **Storybook** <https://storybook.js.org/docs/react/>
  - Chromatic <https://www.chromatic.com/>
    - メモ dependabot はフォークされた PR なのでシークレットキーを公開にしないと使えないので、UI に変更がある可能性のあるものは個別にローカルで`chromatic`コマンドを叩いてデプロイする

#### アーキテクチャ

**Atomic Design** + **CVA (class-variance-authority)** + **独自tw関数** をベースとしたコンポーネント設計を採用

##### コンポーネント設計

- **Atoms**: 最小単位のUIコンポーネント (Button, Input等)
- **Molecules**: Atomsの組み合わせ (Header, Footer等)
- **Organisms**: MoleculesとAtomsの組み合わせ (ContactForm等)
- **Layout**: ページ全体のレイアウト

##### スタイル管理

- **tw関数** (`libs/component-factory.tsx`): CVAとforwardRefを統合した型安全なコンポーネントファクトリー
- **cva (class-variance-authority)**: バリアントベースのクラス管理
- **Tailwind CSS**: ユーティリティファーストCSS
- **tailwind-merge**: クラス名の競合を安全に解決

```tsx
// 使用例
export const Button = tw(
  'button',
  cva('px-4 py-2 rounded', {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
      },
    },
  })
)
```

### スタイルのための資料

- W3C color names <https://www.w3schools.com/colors/colors_names.asp>
- Color Name Finder <https://colors.artyclick.com/color-name-finder/>

#### アニメーション

- Framer Motion <https://www.framer.com/motion/>
  - ease <https://www.framer.com/docs/transition/###ease>

### Linter, Formatter, Maintenance tools

- ESLint <https://eslint.org/docs/latest/>
- Prettier <https://prettier.io/docs/en/>
- ts-unused-exports <https://github.com/pzavolinsky/ts-unused-exports>
- husky <https://typicode.github.io/husky/#/>

### テスト

- Playwright <https://playwright.dev/docs/intro>
- Cypress <https://docs.cypress.io/>

### サーバとのやりとり

- Tumblr API <https://www.tumblr.com/docs/en/api/>
- Notion API <https://developers.notion.com/>
- SWR <https://swr.vercel.app/>

### メールフォーム

- Formspree <https://formspree.io/>
  - <https://vercel.com/integrations/formspree>

## つかいたいもの

## 余裕があればつかいたもの

- Linktree-API <https://documenter.getpostman.com/view/14039622/Tzsik4P8>
  - リンクの二重管理しなくていいかも

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

### DB の勉強

- Prisma?
  - Prisma Github <https://github.com/prisma/prisma>
- Heroku?
- Firebase?
- Upstash? <https://vercel.com/integrations/upstash>

### Deployment

- Vercel
- ~~GitHub Pages~~

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
