import { WhatsApp } from './types'

type WhatsAppStatus = 'UNPAIRED' | 'PAIRING' | 'CONNECTED'

export async function getWhatsAppStatus(
  instance: WhatsApp
): Promise<WhatsAppStatus> {
  return await instance.page
    .waitForFunction(
      () => {
        if (
          document.querySelector('.landing-wrapper') &&
          document.querySelector('canvas')
        ) {
          return 'UNPAIRED'
        }

        const streamStatus =
          window['Store'] &&
          window['Store'].Stream &&
          window['Store'].Stream.displayInfo

        if (['PAIRING', 'RESUMING', 'SYNCING'].includes(streamStatus)) {
          return 'PAIRING'
        }

        const chat: HTMLDivElement = document.querySelector('.app, .two')!
        if (chat && chat.attributes && chat.tabIndex) {
          return 'CONNECTED'
        }

        return false
      },
      {
        timeout: 0,
        polling: 100,
      }
    )
    .then(async (x: any) => await x.evaluate((a: any) => a))
    .catch((e) => e)
}
