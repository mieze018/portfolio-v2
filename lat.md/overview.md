# Overview

イラストレーター mieze(Ayu Nakata) の portfolio サイト（Astro 製）。Notion / Tumblr をビルド時に取得し、Cloudflare Pages 向けに静的生成する。本番の切り替えは別途行う。Tailwind CSS v4 + CVA でスタイリング、Biome で lint/format、Vitest + Storybook + Cypress でテストを管理する。

## Tech Stack

主要な技術構成。詳細な構造は [[architecture]] を、ツール構成は [[tooling]] を参照。

- **フレームワーク**: Astro 7（静的生成）
- **UI**: React 19、Tailwind CSS v4、CVA（class-variance-authority）
- **状態管理**: Jotai（軽量アトムベース）
- **CMS**: Notionhq client（API で Notion DB からデータ取得）
- **テスト**: Vitest（unit + Storybook）、Playwright / Cypress（E2E）
- **CI/CD**: GitHub Actions、Cloudflare Pages（移行先）、Chromatic（Visual Regression）

## Conventions

コーディング規約の詳細は [[conventions]] を参照。スタイリング規約は [[styling]] を参照。

## Concent

サイト設計のコンセプト。没入感と軽快さを最優先。

- 作品や世界観への没入感
    - 水中に沈み込むようなアニメーション表現
    - 作品に集中させるように余計な情報を極力省き、一般的なUIデザインの「便利さ」の踏襲ではなく印象に残ることを主眼とする。
    - ただし学習が必要な認知や操作は禁止
- ページロードや操作の軽快さ
    - 作品への集中を阻害する要因は排除する。