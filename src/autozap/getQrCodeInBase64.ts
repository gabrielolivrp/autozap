import { getWhatsAppStatus } from './getWhatsAppStatus'
import { WhatsApp } from './types'

export interface QrCodeResult {
  base64: string
  urlCode: string
}

export async function getQrCodeInBase64(
  instance: WhatsApp
): Promise<QrCodeResult | undefined> {
  const status = await getWhatsAppStatus(instance)

  if (status === 'UNPAIRED') {
    return await instance.page
      .waitForFunction(() => {
        const qr = document.querySelector('canvas')
        const image = qr?.closest('[data-ref]')
        if (qr && image) {
          return {
            base64: qr.toDataURL(),
            urlCode: image.getAttribute('data-ref')!,
          }
        }
        return false
      })
      // @ts-ignore
      .then(async (x) => await x.evaluate((a) => a))
      .catch((e) => e)
  }
}
