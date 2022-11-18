import {
  asciiQrCode,
  createInstance,
  getAuthChallange,
  sendMessage,
  WhatsApp,
} from 'autozap'

const makeInstance = (id: string) =>
  createInstance({
    id,
    // more configs...
  })

async function main() {
  const instances: Record<string, WhatsApp> = {
    zap1: await makeInstance('zap1'),
    zap2: await makeInstance('zap2'),
  }

  console.log('QRCODE 1')
  let result = await getAuthChallange(instances.zap1, { type: 'base64' })
  console.log(await asciiQrCode(result!.urlCode))

  console.log('QRCODE 2')
  let result2 = await getAuthChallange(instances.zap2, { type: 'base64' })
  console.log(await asciiQrCode(result2!.urlCode))
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
