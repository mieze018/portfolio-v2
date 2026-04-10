# Overview

イラストレーター mieze(Ayu Nakata) の portfolio サイト（Next.js 製）。Notion をヘッドレス CMS として使い、Vercel でデプロイ。Tailwind CSS v4 + CVA でスタイリング、Biome で lint/format、Vitest + Storybook + Cypress でテストを管理する。

## Tech Stack

主要な技術構成。詳細な構造は [[architecture]] を、ツール構成は [[tooling]] を参照。

- **フレームワーク**: Next.js 16（Pages Router）
- **UI**: React 19、Tailwind CSS v4、CVA（class-variance-authority）
- **状態管理**: Jotai（軽量アトムベース）
- **CMS**: Notionhq client（API で Notion DB からデータ取得）
- **テスト**: Vitest（unit + Storybook）、Cypress（E2E）
- **CI/CD**: GitHub Actions、Vercel（本番デプロイ）、Chromatic（Visual Regression）

## Conventions

コーディング規約の詳細は [[conventions]] を参照。スタイリング規約は [[styling]] を参照。
