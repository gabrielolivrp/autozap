## Autozap

### Single session

```typescript
import { createInstance, sendMessage, getChats } from 'autozap'

async function main() {
  const instance = await createInstance({
    id: 'zap',
    // more configs...
  })

  const chats = await getChats(instance, {
    onlyMyContact: true,
    // more params...
  })

  const chatId = '...'
  const response = await sendMessage(instance, chatId, {
    text: 'bla bla bla...',
    simulateTyping: true,
    // more params...
  })
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
```

### Multiple sessions

```typescript
import {
  createInstance,
  sendMessage,
  getChats,
  onMessage,
  WhatsApp,
} from 'autozap'

const makeInstance = (id) =>
  createInstance({
    id,
    // more configs...
  })

async function main() {
  const instances: Record<string, WhatsApp> = {
    zap1: await makeInstance('zap1'),
    zap2: await makeInstance('zap2'),
  }

  const chatId = '...'
  const response = await sendMessage(instances.zap1, chatId, {
    text: 'bla bla bla...',
    simulateTyping: true,
    // more params...
  })

  const chats = await getChats(instances.zap2, {
    onlyMyContact: true,
    // more params...
  })

  onMessage(instances.zap1, (chat, message) => {
    console.log(message)
  })
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
```
