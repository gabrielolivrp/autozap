import { WhatsApp } from '../types'

export async function sendMessage(
  instance: WhatsApp,
  to: string,
  opitions: {
    text: string
  }
): Promise<void> {
  await instance.page.evaluate(
    ({ to, text }: { to: string; text: string }) =>
      // @ts-ignore
      window.WAPI.sendMessage(to, text),
    { to, text: opitions.text }
  )

  await instance.page.waitForTimeout(1000)
}
