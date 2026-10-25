import { expect, test } from '@playwright/test'

test('全ページを直アクセスでき、プレビューは検索対象にしない', async ({ page }) => {
  for (const path of [
    '/',
    '/works',
    '/client_works',
    '/about',
    '/contact',
    '/privacy_policy',
    '/posts/10001',
    '/posts/10002',
  ]) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'mieze illustration' })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow'
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.mieze018.net${path === '/' ? '/' : path}`
    )
  }
})

test('投稿の絞り込みと詳細へのリンクが動作する', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('article')).toHaveCount(1)
  await expect(page.locator('article')).toContainText('personal work')
  await expect(page.locator('article')).toBeVisible()
  await page.getByRole('link', { name: 'この投稿のパーマネントリンク' }).click()
  await expect(page).toHaveURL(/\/posts\/10001$/)
  await expect(page.locator('article')).toContainText('personal work')
  await expect(page.locator('article')).toBeVisible()
  await page.getByTestId('nav-link-/client_works').first().click()
  await expect(page).toHaveURL(/\/client_works$/)
  await expect(page.locator('article')).toHaveCount(1)
  await expect(page.locator('article')).toContainText('commissioned work')
  await expect(page.getByTestId('nav-link-/client_works').first()).toHaveAttribute(
    'aria-current',
    'page'
  )
})

test('画像モーダルが開閉し、URL とスクロール位置を保つ', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page
    .locator('astro-island')
    .evaluate((island) =>
      island.hasAttribute('ssr')
        ? new Promise<void>((resolve) =>
            island.addEventListener('astro:hydrate', () => resolve(), { once: true })
          )
        : undefined
    )
  const image = page.locator('article button').first()
  await image.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  await image.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page).toHaveURL(/#closeup$/)
  await expect(page.getByRole('dialog').locator('img')).toHaveJSProperty('naturalWidth', 1200)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page).not.toHaveURL(/#closeup$/)
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(10)
  expect(errors).toEqual([])
})

test('ページ遷移後のコンテンツ位置とブラウザバックが動作する', async ({ page }) => {
  await page.goto('/contact')
  await page.getByTestId('nav-link-/about').first().click()
  await expect(page).toHaveURL(/\/about$/)
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const section = document.querySelector('section.relative')
        return Math.abs(section?.getBoundingClientRect().top || 0)
      })
    )
    .toBeLessThan(50)
  await page.goBack()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByText('Migration preview only.')).toBeVisible()
})

test('JavaScript が無効でも作品とナビゲーションを表示する', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4321/')
  await expect(page.locator('article')).toContainText('personal work')
  await expect(page.locator('article')).toBeVisible()
  await expect(page.locator('article img')).toHaveJSProperty('naturalWidth', 1200)
  // Why: JS 無効でも動く標準リンクを検証し、スクロール連動で動くヘッダーを避ける。
  await page.getByRole('contentinfo').getByTestId('nav-link-/about').click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { name: 'mieze illustration' })).toBeVisible()
  await context.close()
})

test('実績のある About ページを hydration エラーなく表示する', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/about')
  await expect(page.getByText('『Migration preview book』')).toBeVisible()
  await page
    .locator('astro-island')
    .evaluate((island) =>
      island.hasAttribute('ssr')
        ? new Promise<void>((resolve) =>
            island.addEventListener('astro:hydrate', () => resolve(), { once: true })
          )
        : undefined
    )
  await expect(page.getByText('『Migration preview book』')).toBeVisible()
  expect(errors).toEqual([])
})
