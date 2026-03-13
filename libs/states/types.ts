/**
 * モーダルに表示する画像のデータ型
 *
 * Why: 以前は React.JSX.Element を atom に格納していたが、
 * シリアライズ不可・テスト困難という問題があった。
 * プレーンなデータ型にすることで、テスト容易性と関心の分離を実現。
 */
export type ModalPhoto = {
  src: string
  width: number
  height: number
  alt?: string
}
