import { createInstance, getQrCodeInBase64, getContacts } from '../../src/index'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function main() {
  const instance = await createInstance({
    id: 'zap',
  })

  // const qr = await getQrCodeInBase64(instance)
  // console.log(qr)
  // await sleep(20000)

  const contacts = await getContacts(instance)
  console.log(contacts)
}

main().then(() => process.exit(0))
