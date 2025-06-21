import { test, expect } from '@playwright/test'
test.describe('ページが存在しないアドレスにアクセスした時', () => {
  test('トップページにリダイレクトされる', async ({ page }) => {
    await page.goto('/undefined_page_url')
    //urlが`undefined_page_url`を含まなくなるのを待つ
    await page.waitForURL((url) => !url.toString().includes('undefined_page_url'))
    // サブドメインを含まないurl
    await expect(page.url()).toMatch(/http(s?):\/\/([^/]*)(\/?)$/)
  })
})
