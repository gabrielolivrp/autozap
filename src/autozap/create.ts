import playwright from 'playwright'
import { WhatsApp, InstanceId } from './types'

export type WhatsAppOptions = {
  id: InstanceId
}

async function createInstance(opitions: WhatsAppOptions): Promise<WhatsApp> {
  const browserInstance = await playwright.chromium.launch({
    headless: false,
    devtools: true,
    args: ['--fast-start', '--mute-audio'],
  })

  const page = await browserInstance.newPage({
    baseURL: 'https://web.whatsapp.com',
  })

  return {
    page,
    browserInstance,
    status: 'DISCONNECTED',
    ...opitions,
  }
}

export { createInstance }
