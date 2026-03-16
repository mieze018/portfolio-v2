import { dateToYear } from './dataFormat'

it('年が4桁で返される', () => {
  const year = dateToYear('2020-01-01')
  expect(year).toBe(2020)
})
