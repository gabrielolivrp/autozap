import { resolve } from 'path'
import { Page } from 'playwright'

export async function injectScripts(page: Page, scripts: Array<string>) {
  await Promise.all(
    scripts.map((script) =>
      page.addScriptTag({
        path: resolve(__dirname, `../wa/${script}`),
      })
    )
  )

  return page
}
