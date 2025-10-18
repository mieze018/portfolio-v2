# Visual Identity & Animation Specification

**Status**: Draft
**Scope**: 水面アニメーション / 段階フェードシーケンス / 視覚トーン原則

**Depends On**: SiteFoundationArchitecture (ホームレイアウト), NavigationAndFooter (ナビ表示タイミング)

## Functional Requirements

- VisualIdentityAnimation-FR-001: ホーム初回表示時に水面→タイトル→概要→ナビの順序で可視化される。

## Non-Functional

- VisualIdentityAnimation-NFR-001: 各フェード遷移時間合計は 3 秒以内。
- VisualIdentityAnimation-NFR-002: prefers-reduced-motion を将来検出しアニメーションを最小化（プレース）。

## Success Criteria

- VisualIdentityAnimation-SC-001: 導入シーケンス平均完了 3 秒以内。

## Edge Cases

- 低速回線で画像遅延 → テキストは先行表示。

## Change History

- v0.1 初稿
