interface NotifData {
  id: number
  title?: string
  message: string
  type: 'danger' | 'warn' | 'success' | 'info'
  duration?: number
  remainingTime: number
  action?: () => any
}

interface Menu {
  title: string
  url: string
  id: string
}
