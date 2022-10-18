import { WhatsApp } from '../types'

export function getGroups(instance: WhatsApp): Promise<Array<any>> {
  return instance.page.evaluate('window.WAPI.getAllGroups()')
}
