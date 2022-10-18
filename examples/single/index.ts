import {
  createInstance,
  getQrCodeInBase64,
  getContacts,
  getGroups,
  sendMessage,
} from 'autozap'

async function main() {
  const instance = await createInstance({
    id: 'zap',
  })

  /*
  const result = await getQrCodeInBase64(instance)
  console.log(result)
  */

  const contacts = await getContacts(instance)
  console.log(contacts)
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
