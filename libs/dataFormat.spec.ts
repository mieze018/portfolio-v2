import { expect, test } from '@playwright/test'

import { dateToYear } from './dataFormat'

test('年が4桁で返される', async () => {
  const year = dateToYear('2020-01-01')
  await expect(year).toBe(2020)
})
