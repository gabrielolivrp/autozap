import { ChatId, WhatsApp } from '../types'

export async function sendMessage(
  instance: WhatsApp,
  to: ChatId,
  options: {
    text: string
  }
): Promise<void> {
  await instance.page.evaluate(
    ({ to, text }) => {
      window.WAPI.sendMessage(to, text)
    },
    { to, ...options }
  )

  await instance.page.waitForTimeout(1000)
}
