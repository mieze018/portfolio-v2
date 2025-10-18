# Feature Specification: Reverse Spec – Existing Portfolio Implementation Baseline

**Feature Branch**: `001-reverse-specification-from`  
**Created**: 2025-10-13  
**Status**: Archived (Superseded by domain specs 010-080)  
**Input**: User description: "reverse specification from current implementation aligned with constitution"

## User Scenarios & Testing _(mandatory)_

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 訪問者として作品一覧/トップを閲覧する (Priority: P1)

訪問者はトップページにアクセスし最新または代表作品一覧（外部作品データ提供API 経由取得）を閲覧できる。

**Why this priority**: サイトの主価値（作品閲覧）であり最初の印象と離脱率に直結。作品とともに、サイトのデザインやインタラクションを、「水中」をイメージしたものにしユーザー体験を印象的なものとする。

**Independent Test**: デプロイ後にトップへアクセスし 200 応答・作品カード複数表示を確認すれば成立。

**Acceptance Scenarios**:

1. **Given** 初回訪問, **When** `/` を開く, **Then** `/works` と同等の作品リスト（1件以上）が表示される
2. **Given** API 正常, **When** ビルド時静的生成後初回レンダリング, **Then** 水面アニメーション → サイト名 → 概要 → ナビゲーションの順にフェードイン
3. **Given** スクロール開始, **When** ヘッダー領域を越える, **Then** ナビゲーションが上部固定（sticky）される。作品に集中させるために滲んだ表示。ホバーすると明瞭化。
4. **Given** 作品がタグ分けされている, **When** 表示処理, **Then** 指定タグ以外は描画されない
5. **Given** スクロールが最上部に戻る, **When** ヘッダー領域内に入る, **Then** ナビゲーションがアニメーションと共に初期状態に戻る。

---

### User Story 2 - 訪問者として個別カテゴリ（Personal / Client）閲覧 (Priority: P2)

訪問者はパーソナル作品とクライアント作品を切り分けて閲覧できる。

**Why this priority**: 応募/営業用途でクライアント実績を即座に提示するニーズ。

**Independent Test**: `/works` と `/client_works` に直接アクセスし表示差異（タグフィルタ）が成立するか確認。

**Acceptance Scenarios**:

1. **Given** 作品データが取得済み, **When** `/works` を表示, **Then** personal タグ付きのみ表示
2. **Given** 作品データが取得済み, **When** `/client_works` を表示, **Then** client タグ付きのみ表示
3. **Given** 対象タグ該当 0 件, **When** ページ表示, **Then** 何も表示しない（空メッセージやプレースホルダを出さず余白とする）

---

### User Story 3 - 訪問者として多言語（併記）テキスト理解 (Priority: P3)

訪問者は UI テキストを日英併記で確認できる（トグル不要）。

**Why this priority**: 海外閲覧者/国内利用者双方に即時解釈可能な最小翻訳 UX。

**Independent Test**: 任意の翻訳キー（例: common.json 内 key）で `useTranslation().tb(key)` が `{ ja, en }` を返し UI に両言語が表示される。

**Acceptance Scenarios**:

1. **Given** 翻訳キー存在, **When** `tb` 使用, **Then** 日本語と英語文字列がセットで取得
2. **Given** 翻訳キー未定義, **When** `t` 呼び出し, **Then** key 文字列そのまま返却（フォールバック）
3. **Given** 翻訳キー未定義, **When** `tb` 呼び出し, **Then** 両言語とも key 文字列（フォールバック）

---

### User Story 4 - 訪問者として About / Contact / Privacy ページ参照 (Priority: P3)

静的情報ページ（About, Contact, Privacy Policy）にアクセスし内容を読むことができる。

**Why this priority**: 信頼性・連絡導線確保。

**Independent Test**: 各 URL に直接アクセスし 200 応答し主要見出しが表示される。

**Acceptance Scenarios**:

1. **Given** ルーティング設定, **When** `/about` アクセス, **Then** プロフィール情報表示
2. **Given** 連絡導線, **When** `/contact` アクセス, **Then** フォームまたは説明領域表示
3. **Given** 法務情報, **When** `/privacy_policy` アクセス, **Then** ポリシーテキスト表示

### User Story 5 - フォールバック / エラールート (Priority: P3)

存在しない URL にアクセスした場合 404 ページが表示される。

**Why this priority**: 回遊性維持と離脱抑制。

**Independent Test**: 存在しないパスへアクセスし 404 ページ特有要素を確認。

**Acceptance Scenarios**:

1. **Given** 不正パス, **When** `/unknown-path` アクセス, **Then** 404 コンポーネント表示

---

### User Story 6 - 訪問者として作品画像を拡大閲覧 (Priority: P2)

訪問者は作品サムネイルをクリックして実寸大画像をモーダル（オーバーレイ）で閲覧でき、クリックまたは戻る操作で閉じられる。

**Why this priority**: 作品ディテール確認はポートフォリオ価値の中核。

**Independent Test**: サムネイル → モーダル表示 → 画像クリックで閉じ → 再度開き → ブラウザ戻るで閉じ動作を確認。

**Acceptance Scenarios**:

1. **Given** 作品サムネイル表示, **When** サムネイルクリック, **Then** 拡大画像モーダルが中央表示
2. **Given** モーダル表示中, **When** 画像クリック, **Then** モーダルが閉じる
3. **Given** モーダル表示中, **When** ブラウザ戻る操作, **Then** モーダルが閉じ直前のスクロール位置維持
4. **Given** 別サムネイル, **When** クリック, **Then** モーダル内容が差し替わる

### User Story 7 - 訪問者としてフッターから回遊 (Priority: P3)

訪問者はページ末尾のフッターから主要ページおよび SNS へ遷移できる。

**Why this priority**: 下部離脱時の再回遊導線確保。

**Independent Test**: 任意ページ下部到達→フッターナビ/ SNS リンク表示と遷移確認。

**Acceptance Scenarios**:

1. **Given** ページ末尾, **When** フッターを見る, **Then** ナビゲーションと SNS リンクが表示
2. **Given** ナビリンク, **When** クリック, **Then** 対応ページへ遷移
3. **Given** SNS リンク, **When** クリック, **Then** 外部プロフィールへ遷移（新規タブ or 同タブは現行仕様）

---

### Edge Cases

- 外部作品API 応答遅延 (> 5s) → 初期ロード Loading 表示継続（スケルトン未実装）
- 外部作品API 失敗 → 一覧領域に簡易エラーメッセージ（例: "Failed to load"）を表示・データは描画しない
- 作品 0 件（正常応答で空）→ 何も表示しない（余白保持、空文言なし）
- 翻訳キー欠落 → キー文字列そのまま表示（フォールバック許容）
- 環境変数（外部データ管理/作品APIトークン）欠落 → ビルド失敗またはランタイム例外（今後明示エラー画面検討）
- 画像ロード失敗 → alt 未設定箇所は認知性低下リスク（改善候補）
- モーダル表示中にハッシュが手動変更/除去 → モーダル閉鎖
- モーダル多重起動（連続クリック）→ 直近クリック画像に置換（多重オーバーレイは生成しない）
- ブラウザ戻る連続操作 → モーダル閉鎖後通常ページ履歴遷移

## Requirements _(mandatory)_

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: 作品一覧ページはビルド時静的生成し初回アクセスで 200 応答を返す。
- **FR-002**: トップページは作品一覧コンテンツを再利用して表示できる。
- **FR-003**: Personal / Client Works ページはタグによるフィルタリングで該当作品のみ描画する。
- **FR-004**: タグに該当しない作品は DOM に描画しない（空レンダー許容されない）。
- **FR-005**: 翻訳フックは `t(key)` で日本語、`tb(key)` で日英両方文字列を返す。
- **FR-006**: 不明キーはキー文字列をフォールバックとして返す。
- **FR-007**: 404 ページは存在しないパスに対し専用コンテンツを表示する。
- **FR-008**: About / Contact / Privacy ページは直接 URL でアクセス可能である。
- **FR-009**: 作品データ取得は外部作品データ提供API を通じて行う。
- **FR-010**: 作品データ取得失敗時は一覧領域に簡易エラーメッセージを表示する（再試行ボタンは未実装、将来拡張可）。
- **FR-011**: 外部データ管理サービス取得ユーティリティはソートオプションを受け取り結果を配列で返す。
- **FR-012**: コンポーネントファクトリ `tw` / `twe` は variant 設定に基づきクラス名を生成する。
- **FR-013**: dateToYear ユーティリティは ISO 形式など Date パース可能文字列から西暦を数値で返す。
- **FR-014**: すべての公開ページは読み込み不能な致命的エラーなくレンダリング完了する。
- **FR-015**: ホーム初回表示で水面アニメーション→タイトル→概要→ナビゲーションが段階表示される。
- **FR-016**: スクロールによりナビゲーションはヘッダー領域通過後も上部固定される。
- **FR-017**: 作品サムネイルクリックで拡大画像モーダルを表示する。
- **FR-018**: モーダルは画像クリックまたはブラウザ戻る操作で閉じる（ハッシュ遷移を履歴に残す）。
- **FR-019**: フッターに主要ナビゲーションと SNS リンクを表示する。
- **FR-020**: モーダル表示中は最前面で背景との視覚レイヤ分離を保つ。

### Key Entities

- **Post**: 作品。属性: id, tags[], media, caption, date。
- **Tag**: 作品分類。values: personal, client。
- **TranslationKey**: UI テキスト識別子。属性: key, ja, en。
- **PageContent**: 静的ページ（About/Contact/Privacy）の本文テキスト集合。

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 作品一覧ページ（トップ含む）は正常 API 応答時に初回ビューで 1 秒以内に主要作品グリッド（初期5件以上）が表示される。
- **SC-002**: Personal / Client Works ページは正しいタグ作品のみ 100% の精度で表示（混入 0）。
- **SC-003**: 不明翻訳キー発生率（デプロイ後計測ベース）は 1% 未満（キー総数に対する）。
- **SC-004**: 404 ページは存在しない URL に対して常に 100% 表示される（手動テスト 5 ケース）。
- **SC-005**: 静的情報ページ（About/Contact/Privacy）は外部計測ツールによるアクセシビリティ指標スコアで 70 以上（デザイン優先のため妥協ライン）。
- **SC-006**: ホーム初回アニメーション完了（ナビ表示まで）所要時間は平均 3 秒以内。
- **SC-007**: モーダル画像初回表示までの遅延はサムネイルクリック後 1 秒未満（通常回線想定）。

### Assumptions

- 作品ゼロ時は意図的に空表示とし追加装飾不要。
- API 失敗時のメッセージ文言はシンプル英語（例: "Failed to load"）で十分。
- エラー計測は将来導入予定（SaaS ログ/Sentry 等）で現段階ではプレース保持のみ。
- 大量ページネーション・無限スクロールは今回範囲外。
- 翻訳キーは単一名前空間運用継続（複数分割は将来検討）。
- 外部データ管理サービス（旧: Notion）連携の追加プロパティ取得は将来拡張。
- SNS リンクのターゲット（新規タブ/同タブ）は現行挙動を維持し将来明文化。

## UI Detail Overview (Supplemental)

| Area                | Behavior                                 | Triggers                   | Exit / End Condition | Notes                                                                                        |
| ------------------- | ---------------------------------------- | -------------------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| Introアニメ         | 水面→タイトル→概要→ナビ順次フェード      | 初回ホーム表示             | 全要素表示完了       | スクロールあっても続行                                                                       |
| Sticky Nav          | 上部固定＋目立たないように微妙な明度変化 | ヘッダー領域超過スクロール | 最上部へ戻る         | 上部へ戻ると初期アクセス時の状態にアニメーションする。スティッキー時は作品閲覧の邪魔をしない |
| サムネイル→モーダル | 拡大画像中央表示                         | サムネイルクリック         | 画像/戻る操作        | ハッシュ遷移履歴利用                                                                         |
| モーダル差し替え    | 新画像へ置換                             | 別サムネイルクリック       | 新画像表示           | 多重レイヤ無し                                                                               |
| フッターナビ        | 主要リンク+SNS                           | フッター表示               | ページ離脱           | 上部ナビと同期                                                                               |
| 翻訳表示            | 日英併記                                 | 文言レンダリング           | ページ離脱           | 未定義→キー文字列                                                                            |

### Open Clarifications

（なし）
