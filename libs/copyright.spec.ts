import { copyright } from 'libs/copyright'

describe('copyrightの文字列を求めた時', () => {
  it('今年が2023年の場合「© 2009- 2023 Ayu Nakata」が返る', () => {
    const result = copyright()
    const this_year = `${new Date().getFullYear()}`
    if (this_year === '2023') {
      expect(result).toBe(`© 2009 - 2023 Ayu Nakata`)
    }
    if (this_year !== '2023') {
      expect(result).not.toBe(`© 2009- 2023 Ayu Nakata`)
    }
  })
})
