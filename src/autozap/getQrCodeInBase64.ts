import { WhatsApp } from './types'

async function getQrCodeInBase64(instance: WhatsApp): Promise<string> {
  await instance.page.goto('/')

  return new Promise(async (resolve, _reject) => {
    await instance.page.exposeFunction('resolveQrCode', resolve)
    await instance.page.evaluate(() => {
      const mo = new MutationObserver(function () {
        const qr = document.querySelector('canvas')
        if (qr) {
          ;(window as any).resolveQrCode(qr.toDataURL())
        }
      })
      mo.observe(document.body, { childList: true, subtree: true })
    })
  })
}

export { getQrCodeInBase64 }
