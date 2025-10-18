# Navigation & Footer Specification

**Status**: Draft
**Scope**: ヘッダーナビ / Sticky 挙動 / フッター / SNS リンク

**Depends On**: SiteFoundationArchitecture (レイアウト構造), VisualIdentityAnimation (初回導入アニメ順序)

## Functional Requirements

- NavigationAndFooter-FR-001: ホーム初回表示でタイトル・概要・ナビが段階的に表示される。
- NavigationAndFooter-FR-002: スクロールでヘッダー領域超過後ナビが上部固定される。
- NavigationAndFooter-FR-003: フッターに主要ナビゲーションリンクを表示する。
- NavigationAndFooter-FR-004: フッターに SNS リンクを表示する。

## Non-Functional

- NavigationAndFooter-NFR-001: Sticky 切替の視覚トランジションは 1s 以内。

## Edge Cases

- 最上部へ戻る → ナビ初期状態へアニメーション。
- ナビ多重マウント防止（レイアウト内単一）。

## Success Criteria

- NavigationAndFooter-SC-001: Sticky への切替遅延 < 100ms（体感即時）。
- NavigationAndFooter-SC-002: フッターリンク 100% 生存リンク（デッドリンク 0）。

## Test Mapping

| Requirement                | Storybook      | E2E            | Unit | 備考                       |
| -------------------------- | -------------- | -------------- | ---- | -------------------------- |
| NavigationAndFooter-FR-001 | Header/TopBar  | intro-sequence | -    | 視覚確認/VRT               |
| NavigationAndFooter-FR-002 | Header/Nav     | sticky-scroll  | -    | スクロールシミュレーション |
| NavigationAndFooter-FR-003 | Footer/Default | footer-nav     | -    |                            |
| NavigationAndFooter-FR-004 | Footer/Default | footer-sns     | -    |                            |

## Change History

- v0.1 初稿
