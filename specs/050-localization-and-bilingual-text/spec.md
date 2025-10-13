# Localization & Bilingual Text Specification

**Status**: Draft
**Scope**: 日英併記表示 / 翻訳キー管理 / フォールバック

**Depends On**: SiteFoundationArchitecture (アプリ初期化), TestingQualityGates (キー欠落検出方針)

## Functional Requirements
- LocalizationBilingualText-FR-001: `t(key)` は日本語文字列を返す（存在しない場合 key）。
- LocalizationBilingualText-FR-002: `tb(key)` は `{ ja, en }` を返し両言語が UI に配置される。
- LocalizationBilingualText-FR-003: 未定義キーは両言語とも原キー文字列フォールバック。

## Non-Functional
- LocalizationBilingualText-NFR-001: 翻訳キー解決は同期で O(1)（探索不要）。

## Success Criteria
- LocalizationBilingualText-SC-001: 不明キー発生率 1% 未満。

## Test Mapping
| Requirement | Storybook | E2E | Unit | 備考 |
|-------------|-----------|-----|------|------|
| LocalizationBilingualText-FR-001 | Text/Localized | - | translation.test | | 
| LocalizationBilingualText-FR-002 | Text/LocalizedBoth | - | translation.test | | 
| LocalizationBilingualText-FR-003 | (同上) | - | translation.test | 未定義キーケース |

## Change History
- v0.1 初稿
