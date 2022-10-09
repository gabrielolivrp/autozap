import { Browser, Page } from 'playwright-core'

export type InstanceId = string

export type Status = 'CONNECTED' | 'DISCONNECTED'

export type WhatsApp = {
  readonly id: InstanceId
  readonly page: Page
  readonly browserInstance: Browser
  readonly status: Status
}
