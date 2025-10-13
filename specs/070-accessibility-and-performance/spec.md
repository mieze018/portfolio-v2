# Accessibility & Performance Specification

**Status**: Draft
**Scope**: アクセシビリティ最低ライン / パフォーマンス指標 / フォールバック方針

## Non-Functional Requirements
- AccessibilityPerformance-NFR-001: 静的情報ページ アクセシビリティ指標スコア 70 以上。
- AccessibilityPerformance-NFR-002: 作品一覧初回描画で主要グリッドが 1 秒以内に出現。
- AccessibilityPerformance-NFR-003: モーダル画像表示遅延 1 秒未満 90% 達成。

## Success Criteria
- AccessibilityPerformance-SC-001: Lighthouse A11y >= 70。
- AccessibilityPerformance-SC-002: 初期グリッド表示 TTFCP 1 秒未満（測定サンプル5で 100%）。
- AccessibilityPerformance-SC-003: モーダル表示遅延 <1s 90th パーセンタイル。

## Edge Cases
- 低速環境で指標未達 → 次リリースで改善項目ログ化。

## Change History
- v0.1 初稿
