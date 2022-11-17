import { ChatId, WhatsApp } from '../types'

export async function sendFileMessage(
  instance: WhatsApp,
  to: ChatId,
  base64: string
): Promise<any> {
  return instance.page.evaluate(
    ({ to, base64 }) =>
      WPP.chat.sendFileMessage(to, base64, { type: 'auto-detect' }),
    { to, base64 }
  )
}
