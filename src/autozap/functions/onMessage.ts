import { WhatsApp } from '../types'

interface OnMessageOptions {
  only: 'chat' | 'group' | 'all'
  onlyMessage: 'sent' | 'received' | 'all'
}

const DEFAULT_OPTIONS: OnMessageOptions = {
  only: 'all',
  onlyMessage: 'all',
}

export async function onMessage(
  instance: WhatsApp,
  callback: (data: any) => void,
  options = DEFAULT_OPTIONS
): Promise<void> {
  await instance.page.exposeFunction('callback', callback)
  instance.page.evaluate((options) => {
    window.WAPI.onAnyMessage((data: any) => {
      if (
        (options.onlyMessage === 'all' ||
          (options.onlyMessage === 'sent' && data.fromMe) ||
          (options.onlyMessage === 'received' && !data.fromMe)) &&
        (options.only === 'all' ||
          (options.only === 'group' && data.isGroupMsg) ||
          (options.only === 'chat' && !data.isGroupMsg))
      ) {
        callback(data)
      }
    })
  }, options)
}
