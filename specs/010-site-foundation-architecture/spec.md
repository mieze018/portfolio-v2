# Site Foundation & Architecture Specification

**Status**: Draft
**Scope**: ルート構造 / 静的生成 / 基本ルーティング / 404 / エラーハンドリング最小方針

**Upstream For**: WorksListingFiltering, MediaModalImagePresentation, NavigationAndFooter, LocalizationBilingualText, VisualIdentityAnimation, AccessibilityPerformance, TestingQualityGates

## Overview

- 目的: サイトの土台となるページ生成戦略とルート定義を安定化し、他ドメイン仕様（作品・ナビなど）の前提を固定する。
- 含む: `/`, `/works`, `/client_works`, `/about`, `/contact`, `/privacy_policy`, 404 ルート。
- 含まない: 画像モーダル挙動（030参照）、翻訳キー構造（050参照）。

## User Stories (抜粋)

- トップアクセスで主要作品が表示される (WorksListingFiltering-FR-001 参照)
- 不正URLで 404 ページが表示される

## Functional Requirements

- SiteFoundationArchitecture-FR-001: ルートはビルド時に静的生成され初回アクセスで 200 応答を返す。
- SiteFoundationArchitecture-FR-002: トップ `/` は作品一覧表示用ページを再利用できる構造である。
- SiteFoundationArchitecture-FR-003: 404 ページは存在しない URL 全てに対し適切に表示される。
- SiteFoundationArchitecture-FR-004: 環境変数欠落時はビルド失敗させる（ランタイム放置しない）方針を将来導入（現状プレース）。

## Non-Functional

- SiteFoundationArchitecture-NFR-001: 主要ページの初期 HTML は作品データ描画前でもレイアウトシフトを最小限に保つ。

## Success Criteria

- SiteFoundationArchitecture-SC-001: 主要ルート 6 ページは 100% 正常ビルド成功。
- SiteFoundationArchitecture-SC-002: 404 への直接アクセス 3 ケースで 100% 想定コンテンツ表示。

## Edge Cases

- 無効パス → 404
- 環境変数欠落 → ビルドエラーログ（将来 UI フォールバック検討）

## Test Mapping

| Requirement                       | Storybook              | E2E       | Unit | 備考                 |
| --------------------------------- | ---------------------- | --------- | ---- | -------------------- |
| SiteFoundationArchitecture-FR-001 | (構造的: 該当なし)     | smoke-top | -    | Playwright で確認    |
| SiteFoundationArchitecture-FR-002 | works/top 再利用 story | smoke-top | -    | コンポーネント再利用 |
| SiteFoundationArchitecture-FR-003 | 404 story              | smoke-404 | -    |                      |

## Assumptions

- 追加ページ発生時は本仕様へ追記し番号を増やす。

## Change History

- v0.1 初稿作成
