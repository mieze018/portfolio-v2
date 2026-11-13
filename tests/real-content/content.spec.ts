import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const posts = readdirSync('dist/posts', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `/posts/${entry.name}`)
const routes = ['/', '/works', '/client_works', '/about', '/contact', '/privacy_policy', ...posts]

test.beforeEach(async ({ page }) => {
  // Why: 表示・操作の確認だけを行い、計測とフォームの外部通信を発生させない。
  await page.route(
    /https:\/\/(.*\.)?(google-analytics\.com|googletagmanager\.com|formspree\.io)\//,
    (route) => route.abort()
  )
})

for (const path of routes) {
  test(`実データの直アクセス・画像・hydration: ${path}`, async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' && /hydrat|Minified React error/i.test(message.text())) {
        errors.push(message.text())
      }
    })
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'mieze illustration' })).toBeVisible()
    await expect(page.getByTestId('fixture-banner')).toHaveCount(0)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.mieze018.net${path}`
    )
    await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '')
    for (const image of await page.locator('article img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth), {
          timeout: 30_000,
        })
        .toBeGreaterThan(0)
    }
    if (!path.startsWith('/posts/') || path === posts[0]) {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({
        path: testInfo.outputPath('page.png'),
        fullPage: true,
        animations: 'disabled',
      })
    }
    expect(errors).toEqual([])
  })
}

test('実画像モーダルとページ遷移', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '')
  await page.locator('article button').first().click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(/#closeup$/)
  await expect
    .poll(() => dialog.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth), {
      timeout: 30_000,
    })
    .toBeGreaterThan(0)
  await page.screenshot({ path: testInfo.outputPath('modal.png'), animations: 'disabled' })
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await page.getByTestId('nav-link-/about').first().click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.locator('section.relative')).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
})
