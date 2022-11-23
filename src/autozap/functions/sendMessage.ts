import { ChatId, WhatsApp } from '../types'

export async function sendMessage(
  instance: WhatsApp,
  to: ChatId,
  options: {
    text: string
  }
): Promise<void> {
  await instance.page.evaluate(
    ({ to, text }) => WPP.chat.sendTextMessage(to, text, { createChat: true }),
    {
      to,
      ...options,
    }
  )

  await instance.page.waitForTimeout(2000)
}
