import { WhatsApp } from '../types'

export function getContacts(instance: WhatsApp): Promise<Array<any>> {
  return instance.page.evaluate(() => WAPI.getMyContacts())
}
