import { Page } from 'playwright'
import { injectScripts } from '../utils/injectScripts'

const scripts = ['debundle.js', 'foo.js']

export async function injectWapi(page: Page): Promise<Page> {
  await page.evaluate('window.Store = {"Msg": true}')
  await earlyInjectionCheck(page)
  await injectScripts(page, scripts)
  const check = await checkWapi(page)
  if (check) {
    return page
  }

  console.log('ah não cara')
  process.exit(1)
}

export function checkWapi(page: Page): Promise<boolean> {
  return page.evaluate('window.WAPI && window.Store ? true : false')
}

async function earlyInjectionCheck(page: Page) {
  await page
    .waitForFunction(
      // @ts-ignore-start
      () =>
        Object.entries(window).filter(
          // @ts-ignore
          ([, o]) => o && o.push && o.push != [].push
        )[0]
          ? true
          : false,
      { timeout: 10, polling: 500 }
    )
    .catch(() => {})

  return page.evaluate(() => {
    // @ts-ignore
    if (window.webpackChunkwhatsapp_web_client) {
      // @ts-ignore
      window.webpackChunkbuild = window.webpackChunkwhatsapp_web_client
    } else {
      ;(function () {
        const f = Object.entries(window).filter(
          // @ts-ignore
          ([, o]) => o && o.push && o.push != [].push
        )
        if (f[0]) {
          // @ts-ignore
          window.webpackChunkbuild = window[f[0][0]]
        }
      })()
    }
    //@ts-ignore
    return typeof window.webpackChunkbuild !== 'undefined'
  })
}
