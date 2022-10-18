import playwright from 'playwright'
import { WhatsApp, InstanceId } from './types'
import { chromiumConfigs } from './configs'
import { injectApi } from './api'

export type WhatsAppOptions = {
  id: InstanceId
}

const DEBUG = false

export async function createInstance(
  opitions: WhatsAppOptions
): Promise<WhatsApp> {
  const browser = await playwright.chromium.launchPersistentContext(
    `./tmp/SESSION_${opitions.id}`,
    {
      headless: !DEBUG,
      devtools: DEBUG,
      ...chromiumConfigs,
    }
  )

  const page = browser.pages().at(0)!

  await page.goto('https://web.whatsapp.com', {
    waitUntil: 'networkidle',
  })

  await injectApi(page)

  return {
    page,
    browser,
    status: 'DISCONNECTED',
    ...opitions,
  }
}
