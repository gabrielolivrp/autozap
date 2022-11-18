import { BrowserContext, Page } from 'playwright'

export type InstanceId = string

export type ChatId = string

export interface WhatsApp {
  readonly id: InstanceId
  readonly page: Page
  readonly browser: BrowserContext
}
