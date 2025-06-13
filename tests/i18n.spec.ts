import { test, chromium, expect } from '@playwright/test'

test.describe('日英併記表示が正しく機能しているか', () => {
  test.describe('国際化対応テスト', () => {
    test('ページにアクセスしても言語別ルートにリダイレクトされない', async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en',
      })
      const page = await context.newPage()
      await page.goto('/')
      // 言語プレフィックスがないことを確認
      await expect(page.url()).not.toMatch(/\/en/)
      await expect(page.url()).not.toMatch(/\/ja/)
      await expect(page.url()).toMatch(/\/$/)
      await browser.close()
    })

    test('/about を表示すると日本語と英語の名前が両方表示される', async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en-US',
      })
      const page = await context.newPage()
      await page.goto('/about')

      // 日本語の著者名を確認
      const authorElement = await page.$('[data-testid="author"]')
      const authorText = await authorElement?.textContent()
      await expect(authorText).toContain('mieze')

      // 英語の情報も同時に表示されることを確認
      const pageContent = await page.textContent('body')
      await expect(pageContent).toContain('Ayu Nakata')
      await expect(pageContent).toContain('Osaka')

      await browser.close()
    })

    test('日本語ロケールでも同じページが表示される', async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'ja-JP',
      })
      const page = await context.newPage()
      await page.goto('/about')

      // URLに言語プレフィックスがないことを確認
      await expect(page.url()).toMatch(/\/about$/)

      // 日英両方の内容が表示されることを確認
      const pageContent = await page.textContent('body')
      await expect(pageContent).toContain('mieze')
      await expect(pageContent).toContain('大阪')

      await browser.close()
    })
  })
})
