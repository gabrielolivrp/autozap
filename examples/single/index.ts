import { createInstance, getQrCodeInBase64 } from '../../src/index'

async function main() {
  const instance = await createInstance({
    id: 'zap',
  })

  console.log(await getQrCodeInBase64(instance))
}

main().then(() => process.exit(0))
