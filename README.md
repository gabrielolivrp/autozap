## Autozap

### Single session

```typescript
import { createInstance, sendText, getChats } from 'autozap'

const instance = createInstance({
  id: 'zap',
  // more configs...
})

const chatId = '...'
const response = sendText(instance.zap1, chatId, {
  text: 'bla bla bla...',
  simulateTyping: true,
  // more params...
})

const chats = getChats(instance, {
  onlyMyContact: true,
  // more params...
})
```

### Multiple sessions

```typescript
import {
  createInstance,
  getQrCodeBase64,
  sendText,
  getChats,
  healthCheck,
  onMessage,
} from 'autozap'

const makeInstance = (id) =>
  createInstance({
    id,
    // more params...
  })

const instances: Record<string, WhatsApp> = {
  zap1: makeInstance('zap1'),
  zap2: makeInstance('zap2'),
}

const qrCode = getQrCodeBase64(instance.zap1)

const chatId = '...'
const response = sendText(instance.zap1, chatId, {
  text: 'bla bla bla...',
  simulateTyping: true,
  // more params...
})

const chats = getChats(instance.zap2, {
  onlyMyContact: true,
  // more params...
})

const status = healthCheck(instance.zap2)

onMessage(instance.zap1, (chat, message) => {
  console.log(message)
})
```
