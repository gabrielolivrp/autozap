import { getWhatsAppStatus } from './getWhatsAppStatus'
import { WhatsApp } from './types'

type Options = {
  type: 'base64' | 'urlCode'
}

export async function getAuthChallange(
  instance: WhatsApp,
  options: Options
): Promise<string | undefined> {
  const status = await getWhatsAppStatus(instance)

  if (status === 'UNPAIRED') {
    const result = await instance.page
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

    return result[options.type]
  }
}
