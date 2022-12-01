import { ChatId, WhatsApp } from '../types'

export async function sendAudio(
  instance: WhatsApp,
  to: ChatId,
  base64: string
): Promise<any> {
  return instance.page.evaluate(({ to, base64 }) => WAPI.sendPtt(base64, to), {
    to,
    base64,
  })
}
