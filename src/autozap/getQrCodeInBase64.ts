import { WhatsApp } from './types'

export interface QrcodeResult {
  base64: string
  urlCode: string
}

export async function getQrCodeInBase64(
  instance: WhatsApp
): Promise<QrcodeResult | undefined> {
  const isAuthenticated = await instance.page.evaluate(() => {
    return new Promise(async (resolve, _reject) => {
      const fn = () => {
        if (document.querySelector('.landing-wrapper') !== null) {
          resolve(false)
        } else if (document.querySelector('.app-wrapper-web') !== null) {
          resolve(true)
        }
      }
      const mo = new MutationObserver(fn)
      mo.observe(document.body, { childList: true, subtree: true })
      fn()
    })
  })

  if (!isAuthenticated) {
    return instance.page.evaluate(() => {
      return new Promise(async (resolve, _reject) => {
        const fn = () => {
          const qr = document.querySelector('canvas')
          const image = qr?.closest('[data-ref]')
          if (qr && image) {
            resolve({
              base64: qr.toDataURL(),
              urlCode: image.getAttribute('data-ref')!,
            })
          }
        }
        const mo = new MutationObserver(fn)
        mo.observe(document.body, { childList: true, subtree: true })
        fn()
      })
    })
  }
}
