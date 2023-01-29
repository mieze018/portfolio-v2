import { useTranslation } from 'next-i18next'
import { test, chromium, expect } from '@playwright/test'


test.describe('i18nが正しく機能しているか', () => {
  test.describe('ブラウザの言語が英語の時', () => {
    test('ページにアクセスすると、/en/[path] にリダイレクトされる', async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en',
      })
      const page = await context.newPage()
      await page.goto('http://localhost:3000')
      await expect(page.url()).toBe('http://localhost:3000/en')
    })

    test('/about を表示すると "Ayu Nakata"と表示される', async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en-US',
      })
      const page = await context.newPage()
      await page.goto('http://localhost:3000/en/about')
      //data-testid="about-name"の要素を取得
      const element = await page.$('[data-testid="author"]')
      //要素のテキストを取得
      const text = await element?.textContent()
      await expect(text).toBe('Ayu Nakata')
      await browser.close()
    })
  })
})
