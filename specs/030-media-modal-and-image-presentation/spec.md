# Media Modal & Image Presentation Specification

**Status**: Draft
**Scope**: 画像拡大モーダル / 履歴ハッシュ / 差し替え / 閉じる操作

**Depends On**: WorksListingFiltering (一覧でのサムネイル供給), SiteFoundationArchitecture (ルーティング/静的生成基盤)

## Functional Requirements
- MediaModalImagePresentation-FR-001: サムネイルクリックで拡大画像モーダルが表示される。
- MediaModalImagePresentation-FR-002: 拡大画像クリックでモーダルが閉じる。
- MediaModalImagePresentation-FR-003: ブラウザ戻る操作でモーダルが閉じる。
- MediaModalImagePresentation-FR-004: 別サムネイルクリックでモーダル内容が置換される（多重生成しない）。
- MediaModalImagePresentation-FR-005: モーダル表示時は背景と視覚レイヤ分離しコンテンツが最前面。

## Non-Functional
- MediaModalImagePresentation-NFR-001: モーダル開閉アニメーションは 500ms 以下。
- MediaModalImagePresentation-NFR-002: 画像初回表示遅延 1 秒未満。

## Edge Cases
- 連続クリック → 最後のクリックのみ有効。
- ハッシュ直接除去 → モーダル閉鎖。

## Success Criteria
- MediaModalImagePresentation-SC-001: 開閉操作 5 連続試行で失敗 0。
- MediaModalImagePresentation-SC-002: クリック→表示 1 秒未満 90% 以上。

## Test Mapping
| Requirement | Storybook | E2E | Unit | 備考 |
|-------------|-----------|-----|------|------|
| MediaModalImagePresentation-FR-001 | Post/Photo | modal-open | - | | 
| MediaModalImagePresentation-FR-002 | Post/Photo | modal-close-click | - | | 
| MediaModalImagePresentation-FR-003 | (同上) | modal-close-back | - | | 
| MediaModalImagePresentation-FR-004 | - | modal-replace | - | 連続操作 |
| MediaModalImagePresentation-FR-005 | - | visual-layer | - | スクリーンショット比較 |

## Change History
- v0.1 初稿
