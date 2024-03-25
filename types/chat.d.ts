import type { DataConnection } from 'peerjs'

declare global {
  declare namespace Chat {
    type Type = 'in' | 'out' | 'info'

    interface Message {
      name: string
      userId: string
      avatarId: string
      date: string
    }

    interface ImageMessage {
      url: string
      height: string
      width: string
    }
    type MessageType = string | ImageMessage

    interface ChatMessage extends Message {
      messages: MessageType[]
    }

    interface InfoMessage extends Message {
      messages: string[]
    }

    interface TypedChatMessage extends ChatMessage {
      id: string
      type: Type
    }

    interface TypedInfoMessage extends InfoMessage {
      id: string
      type: 'info'
    }

    type TypedMessage = TypedChatMessage | TypedInfoMessage

    interface CustomDataConnection extends DataConnection {
      data?: {
        id?: string
        name?: string
        avatarId?: string
      }
      timeout?: any
      pingTimeout?: any
    }
  }

}
