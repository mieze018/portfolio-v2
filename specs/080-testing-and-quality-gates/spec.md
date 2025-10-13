# Testing & Quality Gates Specification

**Status**: Draft
**Scope**: Playwright / Storybook Interaction / Vitest / Chromatic / Husky hooks / CI ゲート 総合定義

**Depends On**: All other domain specs (010-070) for requirements under test.

## Functional Requirements
- TestingQualityGates-FR-001: Playwright により主要ユーザーフロー(E2E) を自動化: トップ→作品一覧→モーダル→閉じる。
- TestingQualityGates-FR-002: Storybook Interaction Test で Atom/Molecule/Organism の代表的相互作用 (例: Modal open/close, Button disabled state) をカバー。
- TestingQualityGates-FR-003: Vitest でユーティリティ (dataFormat, translation, hash hooks) の 90%+ ブランチカバレッジ。
- TestingQualityGates-FR-004: Chromatic VRT 差分しきい値: ピクセル差異 < 0.3% / 重大 UI 変更は PR 上で承認必須。
- TestingQualityGates-FR-005: pre-commit (lint-staged), pre-push (typecheck + unit + storybook build dry-run) フック。
- TestingQualityGates-FR-006: CI 上で: typecheck, lint, vitest, playwright, chromatic 通過でマージ可。

## Non-Functional Requirements
- TestingQualityGates-NFR-001: CI 合計所要時間 10 分以内 (将来スケール時の目安)。
- TestingQualityGates-NFR-002: flaky rate (同一テスト 3 連実行で 1 回以上失敗) < 5%。

## Success Criteria
- TestingQualityGates-SC-001: 主要 E2E シナリオ 100% 緑。
- TestingQualityGates-SC-002: クリティカル UI コンポーネント (Button, Modal, Header, WorksGrid) の Interaction Test 全成功。
- TestingQualityGates-SC-003: ユーティリティ群 ブランチカバレッジ >=90%。
- TestingQualityGates-SC-004: Chromatic 差分レビュー全承認 (自動承認なし)。
- TestingQualityGates-SC-005: pre-push で型 or 単体テスト失敗時 push 中断。

## Test Mapping (Initial)
| Requirement | Test Type | File (Planned) |
|-------------|-----------|----------------|
| FR-001 | Playwright E2E | tests/e2e/main-flow.spec.ts |
| FR-002 | Storybook Interaction | *.stories.tsx (play functions) |
| FR-003 | Vitest | libs/**/__tests__/*.test.ts |
| FR-004 | Chromatic VRT | Chromatic build | 
| FR-005 | Husky Hook | .husky/pre-commit / pre-push |
| FR-006 | CI Pipeline | .github/workflows/ci.yml (予定) |

## @Req Tagging Guidelines (Preview)
- Playwright: `test('@Req WorksListingFiltering-FR-002 personal filter', ...)`
- Vitest: `it('@Req LocalizationBilingualText-FR-001 returns JA', ...)`
- Storybook Interaction: `parameters: { docs: { description: { story: 'Implements: MediaModalImagePresentation-FR-001' }}}`
- 収集: CI 将来ステップで `grep -R "@Req"` し未参照 ID や孤立テスト検出。

## Change History
- v0.1 初稿
