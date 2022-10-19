import type * as wajs from '@wppconnect/wa-js'

declare global {
  interface Window {
    WPP: typeof wajs
    Store: any
    WAPI: any
  }
  const WPP: typeof wajs
}

export {}
