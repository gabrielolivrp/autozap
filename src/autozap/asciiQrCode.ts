import qrcode from 'qrcode-terminal'

export async function asciiQrCode(data: string): Promise<string> {
  return new Promise((resolve, _reject) => {
    qrcode.generate(data, { small: true }, (qrcode) => {
      resolve(qrcode)
    })
  })
}
