# Works Listing & Tag Filtering Specification

**Status**: Draft
**Scope**: 作品一覧表示 / タグフィルタ / 空状態 / 取得エラー表示

**Depends On**: SiteFoundationArchitecture (静的生成とルーティング)

## Overview
- 目的: 作品（Post）データを適切に分類・表示し、カテゴリ別回遊を支える。
- 含む: `/works`, `/client_works` のフィルタ挙動、空表示、取得失敗メッセージ。
- 含まない: モーダル拡大表示（030）、翻訳（050）。

## Functional Requirements
- WorksListingFiltering-FR-001: 作品一覧ページは静的生成後に最低 1 件以上の作品を表示できる（0 件時は空表示）。
- WorksListingFiltering-FR-002: personal タグ作品のみ `/works` に表示。
- WorksListingFiltering-FR-003: client タグ作品のみ `/client_works` に表示。
- WorksListingFiltering-FR-004: タグ不一致作品は DOM に描画しない。
- WorksListingFiltering-FR-005: 取得失敗時は一覧領域に簡易エラーメッセージ表示。
- WorksListingFiltering-FR-006: 0 件正常応答時は空（プレース保持のみ）で追加メッセージを表示しない。

## Non-Functional
- WorksListingFiltering-NFR-001: フィルタ処理は O(n) で完了（追加ソート等を行わない）。

## Success Criteria
- WorksListingFiltering-SC-001: personal/client フィルタ精度 100%（混入 0）。
- WorksListingFiltering-SC-002: 失敗時メッセージ表示率 100%（意図しない沈黙なし）。

## Edge Cases
- タグ配列欠落 → 作品スキップ
- 取得失敗（ネット/認証）→ エラーメッセージ
- 0 件 → 空描画

## Test Mapping
| Requirement | Storybook | E2E | Unit | 備考 |
|-------------|-----------|-----|------|------|
| WorksListingFiltering-FR-001 | Posts/Default | smoke-works | - | | 
| WorksListingFiltering-FR-002 | Posts/Personal | smoke-works-personal | - | | 
| WorksListingFiltering-FR-003 | Posts/Client | smoke-works-client | - | | 
| WorksListingFiltering-FR-004 | (同上) | smoke-works | - | DOM 差分で未表示確認 |
| WorksListingFiltering-FR-005 | Posts/Error (仮) | error-simulation | - | Story追加予定 |
| WorksListingFiltering-FR-006 | Posts/Empty (仮) | smoke-works-empty | - | | 

## Assumptions
- タグ値は固定文字列 `personal` / `client`。

## Change History
- v0.1 初稿
