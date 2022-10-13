import { WhatsApp } from './types'

export async function getQrCodeInBase64(instance: WhatsApp): Promise<string> {
  return new Promise(async (resolve, _reject) => {
    await instance.page.exposeFunction('resolveQrCode', resolve)
    await instance.page.evaluate(() => {
      const mo = new MutationObserver(() => {
        const qr = document.querySelector('canvas')
        if (qr) {
          // @ts-ignore
          resolveQrCode(qr.toDataURL())
        }
      })
      mo.observe(document.body, { childList: true, subtree: true })
    })
  })
}
