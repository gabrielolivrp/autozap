import { WhatsApp } from '../types'

interface OnMessageOptions {
  type: 'chat' | 'group' | 'both'
  massages: 'sent' | 'received' | 'both'
}

const DEFAULT_OPTIONS: OnMessageOptions = {
  type: 'both',
  massages: 'both',
}

export async function onMessage(
  instance: WhatsApp,
  callback: (data: any) => void,
  options = DEFAULT_OPTIONS
): Promise<void> {
  await instance.page.exposeFunction('callback', callback)
  instance.page.evaluate((options) => {
    WAPI.onAnyMessage((data: any) => {
      if (
        options.massages === 'both' ||
        (options.massages === 'sent' && data.fromMe) ||
        (options.massages === 'received' && !data.fromMe)
      ) {
        if (
          options.type === 'both' ||
          (options.type === 'group' && data.isGroupMsg) ||
          (options.type === 'chat' && !data.isGroupMsg)
        ) {
          callback(data)
        }
      }
    })
  }, options)
}
