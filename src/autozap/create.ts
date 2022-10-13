import playwright from 'playwright'
import { chromiumConfigs } from './configs'
import { WhatsApp, InstanceId } from './types'
import { injectWapi } from './wapi'

export type WhatsAppOptions = {
  id: InstanceId
}

export async function createInstance(
  opitions: WhatsAppOptions
): Promise<WhatsApp> {
  const browser = await playwright.chromium.launchPersistentContext(
    `./tmp/SESSION_${opitions.id}`,
    {
      headless: false,
      devtools: true,
      ...chromiumConfigs,
    }
  )

  const page = browser.pages().at(0)!
  await page.goto('https://web.whatsapp.com')

  await injectWapi(page)

  return {
    page,
    browser,
    status: 'DISCONNECTED',
    ...opitions,
  }
}
