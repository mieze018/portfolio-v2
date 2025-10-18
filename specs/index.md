# Specifications Index (Domain Slice Model - Plan A)

| Order | Spec Name                        | Directory                                | Requirement ID Prefix (Full Words) | Purpose                                  | Legacy Mapping                         |
| ----- | -------------------------------- | ---------------------------------------- | ---------------------------------- | ---------------------------------------- | -------------------------------------- |
| 010   | Site Foundation & Architecture   | `010-site-foundation-architecture`       | SiteFoundationArchitecture-        | ルート構造 / 静的生成 / 基本ルーティング | FR-001, FR-002, FR-014 部分            |
| 020   | Works Listing & Tag Filtering    | `020-works-listing-and-filtering`        | WorksListingFiltering-             | 一覧/タグ/空状態/取得失敗                | FR-001, FR-003, FR-004, FR-009, FR-010 |
| 030   | Media Modal & Image Presentation | `030-media-modal-and-image-presentation` | MediaModalImagePresentation-       | 拡大画像・モーダル表示/履歴/差し替え     | FR-017, FR-018, FR-020 (一部)          |
| 040   | Navigation & Footer              | `040-navigation-and-footer`              | NavigationAndFooter-               | ヘッダー/Sticky/フッターナビ/SNS         | FR-015, FR-016, FR-019                 |
| 050   | Localization & Bilingual Text    | `050-localization-and-bilingual-text`    | LocalizationBilingualText-         | 日英併記/フォールバック                  | FR-005, FR-006                         |
| 060   | Visual Identity & Animation      | `060-visual-identity-and-animation`      | VisualIdentityAnimation-           | 水面アニメ/段階フェード/表現原則         | FR-015(詳細), SC-006                   |
| 070   | Accessibility & Performance      | `070-accessibility-and-performance`      | AccessibilityPerformance-          | アクセシビリティ指標/速度/空表示方針     | SC-001, SC-005, SC-007 (再配分)        |
| 080   | Testing & Quality Gates          | `080-testing-and-quality-gates`          | TestingQualityGates-               | テスト層/VRT/E2E/ゲート/指標検証         | 全 SC 追跡/検証手段                    |
| 000A  | Reverse Baseline (Archive)       | `001-reverse-specification-from`         | (Legacy FR/SC)                     | 初期自動抽出統合版                       | 全FR/SC 初出                           |

## 命名と関連付けポリシー

- Storybook のストーリー名は Atomic Design 構造（Atoms/Molecules/Organisms）を維持し、仕様 ID を強制含有させない。
- 代わりに: Storybook の stories ファイル先頭コメント、または story の `parameters.docs.description` に `Implements: WorksListingFiltering-FR-003` のように列挙。
- Playwright / Vitest はファイル名へ無理に全IDを詰め込まず、テストケース (it/ test) の直前コメントに `@Req NavigationAndFooter-FR-002` 形式でタグ付け。
- CI で将来的に `@Req` パターンを grep し、spec に存在しない / 未参照ID を検出可能にする方針。

## ID 体系ルール

```
<FullDomainCamelCase>-<Category>-<3-digit>
Category: FR | NFR | SC
例: WorksListingFiltering-FR-001
```

## 分割基準

- 新しいデータソース or 表示レイアウト大改修 → 010 or 020 を改訂
- モーダルに動画 / 複数メディアスライド追加 → 030 拡張
- 新言語追加 → 050 改訂 & バージョンアップ
- 新たなアクセシビリティ閾値導入 → 070 に追記

## 変更履歴管理

- 各 spec に `Change History` セクションを持たせ、`Added / Modified / Deprecated` ラベルで列挙

---

この index は随時更新する。
