import {
  asciiQrCode,
  createInstance,
  getAuthChallange,
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
  const qrcode1 = await getAuthChallange(instances.zap1, { type: 'urlCode' })
  console.log(await asciiQrCode(qrcode1!))

  console.log('QRCODE 2')
  const qrcode2 = await getAuthChallange(instances.zap2, { type: 'urlCode' })
  console.log(await asciiQrCode(qrcode2!))
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
