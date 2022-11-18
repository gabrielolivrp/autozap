import { Page } from 'playwright'

export async function injectApi(page: Page): Promise<void> {
  await page.addScriptTag({
    path: require.resolve('@wppconnect/wa-js'),
  })

  await page
    .waitForFunction(
      () => typeof window.WPP !== 'undefined' && window.WPP.isReady,
      {
        timeout: 60000,
      }
    )
    .catch(() => false)

  await page.addScriptTag({
    path: require.resolve('venom-bot/dist/lib/wapi/wapi.js'),
  })

  await page.addScriptTag({
    path: require.resolve('../wapi/wapi.js'),
  })

  await page.waitForFunction(
    () =>
      typeof window.WAPI !== 'undefined' && typeof window.Store !== 'undefined'
  )
}
