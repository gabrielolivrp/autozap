import { ChatId, WhatsApp } from '../types'

export async function sendAudio(
  instance: WhatsApp,
  to: ChatId,
  base64: string
): Promise<any> {
  return instance.page.evaluate(
    ({ to, base64 }) =>
      WPP.chat.sendFileMessage(to, base64, {
        type: 'audio',
        isPtt: true,
      }),
    {
      to,
      base64,
    }
  )
}
