import { expect, test } from '@playwright/test'

import { copyright } from 'libs/copyright'

test.describe('copyrightの文字列を求めた時', async () => {
  test('今年が2023年の場合「© 2009- 2023 Ayu Nakata」が返る', async () => {
    const result = copyright()
    const this_year = `${new Date().getFullYear()}`
    if (this_year === '2023') {
      await expect(result).toBe(`© 2009 - 2023 Ayu Nakata`)
    }
    if (this_year !== '2023') {
      await expect(result).not.toBe(`© 2009- 2023 Ayu Nakata`)
    }
  })
})
