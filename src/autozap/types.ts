import { BrowserContext, Page } from 'playwright'

export type InstanceId = string

export type Status = 'CONNECTED' | 'DISCONNECTED'

export interface WhatsApp {
  readonly id: InstanceId
  readonly page: Page
  readonly browser: BrowserContext
  readonly status: Status
}
