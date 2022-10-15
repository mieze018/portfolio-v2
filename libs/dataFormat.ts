export const dateToYear = (date: string) => {
  return new Date(date).getFullYear()
}

/** 日付のローカライズ。デフォルトで曜日まで表示 ex:2022年6月21日(火) */
// export const localizeDate = ({ date = '', year = true, month = true, day = true, week = true, time = false }): string =>
//   dayjs(date)
//     .locale(ja)
//     .format(
//       `${year ? 'YYYY年' : ''}${month ? 'M月' : ''}${day ? 'D日' : ''}${week ? '(ddd)' : ''}${time ? 'HH:mm' : ''}`
//     )
