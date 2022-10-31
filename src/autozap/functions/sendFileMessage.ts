import { ChatId, WhatsApp } from '../types'

export async function sendFileMessage(
  instance: WhatsApp,
  to: ChatId,
  base64: string
) {
  return instance.page.evaluate(
    `WPP.chat.sendFileMessage("${to}", "${base64}")`
  )
}
