# Development Notes

個人的な開発メモ・ルール・教訓をまとめたファイルです。
（もともと README にあった内容をここに移動しました）

---

## セットアップ補足

### Windows 環境での Git 設定

Windows では Git のデフォルト設定 `core.autocrlf=true` により、
チェックアウト時にファイルの改行コードが CRLF に変換される。
Biome の `lineEnding: "lf"` 設定と衝突し、pre-push フックが失敗するため、
**リポジトリをクローン後に以下を実行すること**:

```bash
git config core.autocrlf false
```

その後、既存の CRLF ファイルを LF に変換するため全ファイルを削除・再チェックアウトする:

```bash
python3 -c "
import subprocess, os
files = subprocess.run(['git', 'ls-files', '-z'], capture_output=True).stdout.split(b'\x00')
[os.remove(f.decode('utf-8')) for f in files if f]
"
git checkout HEAD -- .
```

> **Why**: `.gitattributes` の `eol=lf` だけでは Windows の `core.autocrlf=true` を
> 上書きできないケースがある（ファイル削除なしの `git reset --hard` では作業ディレクトリが
> 更新されない）。詳細は [#1423](https://github.com/mieze018/portfolio-v2/issues/1423) 参照。

---

## ファイル / ディレクトリ命名規則

> 教訓: 後から大文字小文字を変更するとローカルでは認識されてもサーバーで認識されないことがある。
> 一度親ディレクトリごとリネーム → 中身のリネーム → 親の名前を戻す、とするとよい。

| 対象 | ケース |
|---|---|
| `./pages` 以下のルーティングファイル | スネークケース（URLパスに準じる） |
| React コンポーネント（`.tsx`）とそのディレクトリ | パスカルケース |
| メソッド・型（`.ts`）・設定ファイル | キャメルケース |

---

## ディレクトリの役割

### `./components`

UI コンポーネント（Atomic Design: Atoms / Molecules / Organisms / Layout）

### `./pages/api`

データ配列の定義。型定義で `type` ではなく `interface` を使うのは JSON データに型をつけたいとき。

### `./libs`

メソッド・型・i18n など

---

## Storybook / Chromatic 注意事項

Dependabot はフォークされた PR なのでシークレットキーを公開にしないと使えない。
UI に変更がある可能性のあるものは、個別にローカルで `chromatic` コマンドを叩いてデプロイすること。

---

## スタイル参考資料

- W3C color names: <https://www.w3schools.com/colors/colors_names.asp>
- Color Name Finder: <https://colors.artyclick.com/color-name-finder/>

---

## アニメーション教訓メモ

- 再レンダリングすると描写がリセットされる。トランジションも効かなくなる
  - 親要素（Wrapper）があるとダメなケースがある
  - Framer Motion で対応できる場合がある
- アニメーションで指定されているスタイルはそうでないスタイルより強い
- ~~長さの単位は揃えないとトランジションしない~~（解決済み）

### アニメーションと Styled Components

- 複数のアニメーションをさせる場合、1 つの `animation` プロパティ内で全て指定しないといけない。プロパティを上書きすると後のしか残らない
- DOM の出現からずっと継続させたいアニメーションは、クラス再生成するとその都度リセットされる。動的なスタイルと別クラスで指定して再生成されないようにする

---

## 将来やりたいこと（別リポジトリ・エンジニアポートフォリオ向け）

### HeadlessCMS 候補

- WordPress (Headless)
- Strapi
- Ghost
- microCMS

### 使いたい技術

- GraphQL / WPGraphQL
- Prisma
- Heroku / Firebase / Upstash

### その他メモ

- Linktree API (<https://documenter.getpostman.com/view/14039622/Tzsik4P8>) — リンクの二重管理をなくせるかも
