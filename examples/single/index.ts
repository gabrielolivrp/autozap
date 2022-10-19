import {
  createInstance,
  getQrCodeInBase64,
  getContacts,
  getGroups,
  sendMessage,
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

  let result = await getQrCodeInBase64(instance)
  while (result !== undefined) {
    console.log(await asciiQrCode(result.urlCode))
    await sleep(10000)
    result = await getQrCodeInBase64(instance)
  }

  await sleep(10000)
  const contacts = await getContacts(instance)
  console.log(contacts)
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
