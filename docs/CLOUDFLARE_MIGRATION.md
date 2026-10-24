# Astro / Cloudflare Pages への移行

## 構成

Astro がビルド時に Notion と Tumblr を取得し、`dist/` に静的 HTML を生成する。
React 19 / Jotai / Motion / Tailwind CSS v4 の既存部品を再利用し、Astro の
ClientRouter と永続化する React island でナビゲーション・画像モーダルを動かす。
サーバー実行用の Cloudflare アダプターや Worker は不要。

URL は `/`、`/works`、`/client_works`、`/about`、`/contact`、`/privacy_policy`、
`/posts/<Tumblr id_string>` を維持する。存在しないページは `404.html` から従来どおり
トップへ移動する。JavaScript が無効なら404の説明とトップへのリンクを表示する。

Tumblr の投稿一覧はページネーションで全件取得する。投稿を追加した後は、サイトのコードを
変更せず再ビルドするだけで一覧と詳細ページに反映される。編集・削除も次のビルドで反映する。
Notion の DB もページネーションで全件取得する。API の取得失敗はビルド失敗にし、
空データやテストデータを本番へ自動的に代用しない。

## ローカル開発

Node.js **22.23.4** / pnpm **10.33.0** を使用する。Node の引き上げは Astro 7 と
React integration の要求バージョンに合わせたもの。

```sh
pnpm install --frozen-lockfile
pnpm dev:fixtures
pnpm build:fixtures
pnpm preview
```

`fixtures` モードは外部 API・外部画像・フォーム送信・アクセス計測に依存しない。
2件のサンプル投稿を含む9ページを生成する。プレビューバナーと `noindex, nofollow` を付ける。
本番のビルドコマンドに `build:fixtures` を指定しないこと。

実データは `.env.example` を参考にローカルの `.env` に設定して `pnpm dev` / `pnpm build` を使用する。
`.env` は Git 管理しない。

| 変数 | 用途・公開範囲 |
| --- | --- |
| `NOTION_TOKEN` | ビルド専用の認証情報。`libs/notionDB.ts` の DB / ページへのアクセス権限が必要 |
| `TUMBLR_API_KEY` | ビルド専用。mieze018.tumblr.com の投稿取得 |
| `PUBLIC_FORM_ID` | 公開可能な Formspree のフォーム ID。未設定時はメールアドレスを表示 |
| `PUBLIC_GOOGLE_ANALYTICS_ID` | 公開可能な GA の測定 ID。未設定時は計測スクリプトを出力しない |

移行期間中は、既存の `NEXT_PUBLIC_NOTION_TOKEN`、`NEXT_PUBLIC_api_Key`、
`NEXT_PUBLIC_FORM`、`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` も対応する値の代替として読み取る。
新しい名前を優先する。Notion / Tumblr の認証情報はサーバーのビルド処理だけで読み取り、
React には取得済みの表示データだけを渡す。`PUBLIC_` で始まる名前へ認証情報を入れない。

エージェント環境でCLIが自動的にバックグラウンド化される場合は、管理するセッションや
Playwright の webServer では `--ignore-lock` を付けてフォアグラウンド起動する。

## 画像・フォント・計測

- 作品画像は現在の Tumblr 上のファイルを引き続き使用する。Tumblr の `alt_sizes` を
  `srcset` に使い、一覧では遅延読み込み、拡大時は元画像を表示する。
- Next.js の画像最適化エンドポイントと有料の画像変換サービスは使用しない。
  現段階では作品画像を Cloudflare へ複製・リサイズしていない。
- EB Garamond / Noto Serif JP は Fontsource から静的アセットへ含める。
  ビルド中の Google Fonts へのアクセスは不要。
- Vercel Analytics を削除。Google Analytics は設定があるときだけ Astro の
  ページ表示イベントで計測する。Cloudflare Web Analytics の追加は任意。

## 検証

```sh
pnpm typecheck
pnpm test:unit
pnpm exec playwright install chromium
pnpm test:storybook
pnpm test:e2e
pnpm build-storybook
pnpm lat:check
```

ブラウザが既にインストールされている環境では
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` のように指定できる。
`test:e2e` は fixture ビルドとプレビューサーバーを自身で起動し、以下を検証する。

- 全URLの直アクセス、canonical、プレビューの noindex
- 個人作品と依頼作品の絞り込み、投稿詳細リンク
- モーダルの開閉、ハッシュ更新、スクロール位置
- ページ遷移、現在地表示、コンテンツ位置、ブラウザバック
- JavaScript 無効時の静的表示とリンク、404からの移動

CI の `astro.yml` で型チェックと上記E2Eを実行する。既存の Cypress も fixture ビルドを
使うように変更しており、外部APIの認証情報や Cypress Cloud の記録キーを必要としない。
実データのビルド、実際のTumblr画像、Formspree送信、GA送信は本物の設定で別途確認する。

### PR の見た目の検証

Cloudflare アカウントが未作成でも GitHub Actions と Chromatic による検証は実行できる。
`chromatic.yml` は push 時に Storybook をビルド・送信し、既存のベースラインとの差分を検出する。
`components/Portfolio.stories.tsx` は固定データの主要ページを 375px / 1280px で撮影し、
開いた画像モーダルも固定画像で検証する。Storybook テストは `astro.yml` でも実行する。

Chromatic のビルド成功は見た目の承認完了を意味しない。変更されたスナップショットは
既存ベースラインと比較し、新しいページのスナップショットは初回ベースラインとしてレビューする。
差分の自動承認や、検証を通すための一括ベースライン更新は行わない。
Storybook では拾えない HTML ルート・hydration・ページ遷移は Playwright で検証する。
fixture の About に実績データを含め、空データだけで SSR の問題を見逃さないようにする。

PR の検証後に Cloudflare アカウントと Pages を用意し、実データでのプレビュー検証を行う。
マージ・本番公開・DNS 変更はその結果を確認した後の作業とし、PR 検証だけでは実施しない。

## Cloudflare Pages の設定

Pages の Git 連携で次を指定する。Next.js 用のプリセットは使わない。

| 項目 | 値 |
| --- | --- |
| プロジェクトルート | リポジトリのルート |
| 本番ブランチ | `master` |
| ビルドコマンド | `pnpm build` |
| 出力ディレクトリ | `dist` |
| Node | `NODE_VERSION=22.23.4` |
| pnpm | `PNPM_VERSION=10.33.0` |

上記のアプリ用変数を Pages のビルド環境に設定する。本番・プレビューそれぞれに必要。
ローカルのクラウド開発環境へ入れた値は Cloudflare に自動転送されない。

本番の認証情報がない間に動作を試す場合は、**別の検証用プロジェクト**で
`pnpm build:fixtures` を指定する。本番ドメインは接続しない。

## 切り替えと切り戻し

1. 移行用ブランチを Pages のプレビューとしてビルドする。公開検索の対象にしない設定を確認する。
2. 実データで全ページ、画像、フォーム、スマートフォン表示、canonical を検証する。
3. 既存の DNS / リダイレクト設定と Vercel のデプロイを記録し、Vercel を維持する。
4. `www.mieze018.net` を Pages のカスタムドメインとして登録し、必要な DNS 設定と証明書を確認する。
   apex ドメインからの既存リダイレクトも維持する。DNS のネームサーバーを変更する場合は
   メール用の MX / TXT などサイト以外のレコードも引き継ぐ。
5. 本番へ切り替え、主要URLとログを確認する。問題時は記録した配信先へ戻す。

この変更は Cloudflare プロジェクトの作成、デプロイ、DNS変更を実行しない。
投稿更新のビルド起動方法は既存運用を確認して接続する。手動デプロイでも同じページ生成が動く。
