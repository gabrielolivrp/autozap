import { WhatsApp } from './types'
import fs from 'fs'

export async function logout(instance: WhatsApp) {
  try {
    fs.rmSync(`./autozap/SESSION_${instance.id}`, {
      recursive: true,
      force: true,
    })
  } catch (err) {
    console.error(err)
  }
}
