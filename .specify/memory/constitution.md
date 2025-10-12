# mieze illustration portfolio 憲法

本ドキュメントは、個人開発ポートフォリオサイト「mieze illustration portfolio」の設計・運用・保守における基本方針および品質基準を定めるものである。

## コア原則

1. **型安全・ビルド時検出最優先**

   - 型エラーや構文エラーはビルド時に検出し、未解決のままデプロイしない。
   - TypeScript型定義を徹底し、型安全性を損なう変更は原則禁止とする。any型も原則禁止。

2. **シンプルさ／不要な最適化の禁止（YAGNI）**

   - 必要以上に複雑な設計や、現時点で不要な最適化は行わない。
   - コード・UIともに「今必要なもの」に集中する。

3. **テストファースト（Should）／VRT重視**

   - UIはStorybookによるインタラクションテスト・VRT（Visual Regression Test）を必須とする。
   - TDDは推奨だが、必須ではない。E2Eテストも適宜実施。

4. **ライブラリファースト／コンポーネント単位独立性**

   - UIコンポーネントは可能な限り独立性を保ち、再利用性・保守性を重視する。
   - デザインシステムの原則に従い、Atoms/Molecules/Organisms/Layout単位で管理する。

5. **アクセシビリティ・UI/UX優先**
   - 画像中心のポートフォリオサイトとして、致命的なアクセシビリティ障害（操作不能・情報取得不能）は許容しない。
   - ただしデザイン・ブランディングを優先し、文字のコントラストやサイズは多少妥協を許容する。

## デザインシステム運用

- Tailwind CSS, class-variance-authority (CVA), 独自tw関数を用いた一貫したスタイル管理を行う。
- コンポーネントのバリアント設計・命名規則は既存ルールに従う。
- Storybookを仕様ソース・ドキュメント・VRT・インタラクションテストの基盤とする。

## 品質ゲート・CI/CD

- GitHub Actionsで実行される全テスト（lint, typecheck, unit〈Vitest〉, E2E〈Playwright〉, Storybookビルド, Chromatic VRT, Interaction Test）は必ず通過すること。
- Vercel Deploy Preview のビルド成功を必須とする。
- 純ロジック・ユーティリティ・フック（DOM 依存なし）は Vitest でユニットテストする。`tests/unit` 配下に配置。
- E2E は Playwright に一本化し、ユニットテストで担保できない動作のみを対象とする。クロスブラウザ（Chromium / Firefox / WebKit）smoke を将来的に選択可能とする。
- DOM / UI 状態遷移は Storybook Interaction Test + Chromatic VRT を主戦力とし、重複した E2E シナリオは作らない。
- Husky により push 前に以下をローカル実行し早期失敗させる：
  - lint, typecheck（インクリメンタル / キャッシュ活用推奨）
  - 変更差分に関連する Vitest（--changed / --run など運用で調整）
  - 高コスト（Chromatic, Playwright 全件, Vercel ビルド）は CI / プレビューに委譲
- 目的: 無駄な CI 実行・無料枠消費抑制とフィードバックループ最短化。

## ガバナンス・改訂

- 本憲法は、個人開発者本人が必要に応じて改訂・運用する。
- 改訂時は、日付とバージョン番号を明記し、過去の内容を履歴として残す。
- 本ドキュメントに従わない変更は、原則としてレビュー・デプロイ時に拒否される。

**バージョン**: 1.0.0 | **施行日**: 2025-10-13 | **最終改訂**: 2025-10-13
