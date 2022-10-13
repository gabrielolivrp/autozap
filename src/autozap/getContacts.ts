import { WhatsApp } from './types'

export function getContacts(instance: WhatsApp): Promise<any> {
  return instance.page.evaluate('WAPI.getAllContacts()')
}
