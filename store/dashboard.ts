import { create } from 'zustand'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  message: string
  timestamp: number
  read: boolean
  link?: string
  linkText?: string
}

interface IPFSFile {
  cid: string
  name: string
  type: 'text' | 'image' | 'file'
  content?: string
  timestamp: number
}

interface DashboardState {
  notifications: Notification[]
  ipfsFiles: IPFSFile[]
  telegramChatId: string | null
  activeTab: 'vault' | 'inheritance' | 'notifications'
  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
  
  addIPFSFile: (file: Omit<IPFSFile, 'timestamp'>) => void
  removeIPFSFile: (cid: string) => void
  
  setTelegramChatId: (chatId: string) => void
  setActiveTab: (tab: DashboardState['activeTab']) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  notifications: [],
  ipfsFiles: [],
  telegramChatId: typeof window !== 'undefined' 
    ? localStorage.getItem('telegramChatId') || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || null
    : null,
  activeTab: 'vault',
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Math.random().toString(36).substring(2, 11),
        timestamp: Date.now(),
        read: false,
      },
      ...state.notifications,
    ].slice(0, 50),
  })),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  addIPFSFile: (file) => set((state) => ({
    ipfsFiles: [
      { ...file, timestamp: Date.now() },
      ...state.ipfsFiles,
    ],
  })),
  
  removeIPFSFile: (cid) => set((state) => ({
    ipfsFiles: state.ipfsFiles.filter((f) => f.cid !== cid),
  })),
  
  setTelegramChatId: (chatId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('telegramChatId', chatId)
    }
    set({ telegramChatId: chatId })
  },
  
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
