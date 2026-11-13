# Astro / Cloudflare Workers Static Assets への移行

## 構成

Astro がビルド時に Notion と Tumblr を取得し、`dist/` に静的 HTML を生成する。
React 19 / Jotai / Motion / Tailwind CSS v4 の既存部品を再利用し、Astro の
ClientRouter と永続化する React island でナビゲーション・画像モーダルを動かす。
サーバー実行用の Cloudflare アダプターや Worker スクリプトは不要。

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

- Tumblr の JPEG・PNG・WebP 作品画像は Astro の `getImage()` でビルド時に WebP（品質80）へ変換する。
  最大1280px、320・640・960pxの候補を元画像の幅以下で生成し、`dist/_astro/` から静的配信する。
  一覧・詳細は画面幅に応じた `srcset` と遅延読み込みを使い、拡大時は元画像を表示する。
  GIF・SVG・fixture画像は変換しない。元画像の取得・変換時間がビルドに加わる。
- Next.js の画像最適化エンドポイントと有料の画像変換サービスは使用しない。
  生成した画像はHTMLと一緒にCloudflareへ配信するため、閲覧時の画像変換処理は不要。
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

同一リポジトリの PR では `astro.yml` の `real-content` ジョブが GitHub Actions の
シークレットで実データをビルドする。`TUMBLR_API_KEY` / `NOTION_TOKEN` を優先し、
既存の `NEXT_PUBLIC_api_Key` / `NEXT_PUBLIC_NOTION_TOKEN` も利用できる。
秘密の値をクラウド作業環境へ取り出したり、再入力したりする必要はない。
fork / Dependabot の PR にはこのジョブを実行せず、シークレットはビルドステップだけに渡す。
実データビルドもデプロイ・フォーム送信・GA送信は実行しない。
ビルド後は `playwright.real.config.ts` で生成済みの全ルートを PC / モバイル幅で開き、
実画像の読み込み、hydration、モーダル、ページ遷移を検証する。
主要ページとモーダルのスクリーンショット・HTMLレポートは Actions の
`real-content-browser-results` に7日間保存する。計測・フォーム宛ての通信はブラウザで遮断する。
この検証は Cloudflare 上での配信確認とは別であり、Workers のプレビュー確認も必要。

Cloudflare アカウントが未作成でも GitHub Actions と Chromatic による検証は実行できる。
`chromatic.yml` は push 時に Storybook をビルド・送信し、既存のベースラインとの差分を検出する。
`components/Portfolio.stories.tsx` は固定データの主要ページを 375px / 1280px で撮影し、
開いた画像モーダルも固定画像で検証する。Storybook テストは `astro.yml` でも実行する。

Chromatic のビルド成功は見た目の承認完了を意味しない。変更されたスナップショットは
既存ベースラインと比較し、新しいページのスナップショットは初回ベースラインとしてレビューする。
差分の自動承認や、検証を通すための一括ベースライン更新は行わない。
Storybook では拾えない HTML ルート・hydration・ページ遷移は Playwright で検証する。
fixture の About に実績データを含め、空データだけで SSR の問題を見逃さないようにする。

PR の検証後に Cloudflare Workers を用意し、実データでのプレビュー検証を行う。
マージ・本番公開・DNS 変更はその結果を確認した後の作業とし、PR 検証だけでは実施しない。

## Cloudflare Workers Static Assets の設定

`wrangler.jsonc` は Worker `portfolio-v2` に `dist/` を静的配信する設定。
Astro は `/works/index.html` などを生成するため、`html_handling: drop-trailing-slash`
で既存の `/works` にURLを統一する。`not_found_handling: 404-page` は生成済みの
`404.html` をHTTP 404で返す。SSRアダプターやWorkerスクリプトは追加しない。
既存実装を維持できる一方、CMS更新の反映には再ビルドが必要。

Wranglerは開発依存に固定する。Workers Previewsは4.135.0以上を必要とし、
`previews: {}` を使ってブランチごとの検証配信を作る。

```sh
# ローカルの配信確認（アップロードなし）
pnpm build:fixtures
pnpm exec wrangler dev --local
```

実データでのプレビュー配信は、ビルド環境にCMS認証情報を設定してから行う。
fixture出力のまま実データ検証用のプレビューへアップロードしない。

```sh
pnpm build
pnpm exec wrangler preview
```

Workers Buildsを使う場合:

| 項目 | 値 |
| --- | --- |
| リポジトリ | `mieze018/portfolio-v2` |
| ルート | リポジトリのルート |
| プロダクションブランチ | `master` |
| 検証するブランチ | `feat/astro-cloudflare-pages` |
| ビルドコマンド | `pnpm run build` |
| プレビューコマンド | `npx wrangler preview` |
| Node | `NODE_VERSION=22.23.4` |
| pnpm | `PNPM_VERSION=10.33.0` |

プレビューブランチのビルドとプレビューURLを有効にする。
`wrangler deploy` はWorkerのプロダクションへ配信するため、ブランチの検証には使わない。
Workerへの配信と既存サイトのカスタムドメイン/DNS切り替えは別の操作。

プレビュー用の**ビルド**シークレットとして `TUMBLR_API_KEY` と `NOTION_TOKEN` を設定する。
既存の旧名も利用できるが新名を優先する。実行時のWorker secretへの登録だけでは
ビルドに渡らない。ローカルやGitHubの値も自動転送されない。
フォームとGAを設定しないプレビューは、フォームがメールリンク、GAが計測なしとなる。

GitHub Actionsの実データビルドも利用できる。ただし現在のワークフローはdistの配信処理を
持たないため、Actionsから配信する場合はCloudflare認証と配信処理の追加が必要。

プレビューURLは既定で公開される。実データビルドにはfixture専用のnoindexは付かないため、
配信前にCloudflare Accessや検索除外の設定を確認する。

公式資料:

- [Astro静的サイト](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [HTML URLの正規化](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [カスタム404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [Workers Previews](https://developers.cloudflare.com/workers/previews/get-started/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)

## 切り替えと切り戻し

1. 移行用ブランチを Workers のプレビューとしてビルドする。公開検索の対象にしない設定を確認する。
2. 実データで全ページ、画像、フォーム、スマートフォン表示、canonical を検証する。
3. 既存の DNS / リダイレクト設定と Vercel のデプロイを記録し、Vercel を維持する。
4. `www.mieze018.net` を Workers のカスタムドメインとして登録し、必要な DNS 設定と証明書を確認する。
   apex ドメインからの既存リダイレクトも維持する。DNS のネームサーバーを変更する場合は
   メール用の MX / TXT などサイト以外のレコードも引き継ぐ。
5. 本番へ切り替え、主要URLとログを確認する。問題時は記録した配信先へ戻す。

この変更は Cloudflare プロジェクトの作成、デプロイ、DNS変更を実行しない。
投稿更新のビルド起動方法は既存運用を確認して接続する。手動デプロイでも同じページ生成が動く。
