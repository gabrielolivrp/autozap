import {
  createInstance,
  getAuthChallange,
  getContacts,
  asciiQrCode,
} from 'autozap'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function main() {
  const instance = await createInstance({
    id: 'zap',
  })

  let qrcode = await getAuthChallange(instance, { type: 'urlCode' })
  while (qrcode !== undefined) {
    console.log(await asciiQrCode(qrcode))
    await sleep(10000)
    qrcode = await getAuthChallange(instance, { type: 'urlCode' })
  }

  await sleep(10000)
  const contacts = await getContacts(instance)
  console.log(contacts)
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
