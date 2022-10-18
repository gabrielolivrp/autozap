import { resolve } from 'path'
import { Page } from 'playwright'

export async function injectApi(page: Page): Promise<void> {
  const wasInjected = await page
    .evaluate(
      () =>
        typeof window.WAPI !== 'undefined' &&
        typeof window.Store !== 'undefined'
    )
    .catch(() => false)

  if (wasInjected) {
    return
  }

  await page.addScriptTag({
    path: require.resolve('@wppconnect/wa-js'),
  })

  await page.waitForFunction(() => window.WPP?.isReady)

  await page.addScriptTag({
    path: resolve(__dirname, '../wapi/debundle.js'),
  })

  await page
    .waitForFunction(
      () =>
        typeof window.WAPI !== 'undefined' &&
        typeof window.Store !== 'undefined',
      {
        timeout: 70000,
      }
    )
    .catch(() => false)
}
