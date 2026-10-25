# mieze illustration — portfolio v2

Portfolio site of Ayu Nakata, an Osaka, Japan-based artist & illustrator.

Astro で静的生成し、React / Tailwind CSS / Motion の UI を利用する。
Cloudflare Pages への移行用実装。本番切り替えは別途行う。

```sh
# Node 22.23.4 / pnpm 10.33.0
pnpm install --frozen-lockfile
pnpm dev:fixtures
```

実データでの開発は `.env.example` を参考に設定して `pnpm dev`。
`pnpm build` の出力は `dist/`。Tumblr の投稿追加はコード変更なしで再ビルド時に反映される。

環境変数、テスト、画像の扱い、Pages の設定、切り替え手順は
[移行ガイド](docs/CLOUDFLARE_MIGRATION.md)を参照。
