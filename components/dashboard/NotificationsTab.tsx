'use client'

import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboard'
import { Bell, Check, Trash2, Settings, Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDistance } from 'date-fns'

export function NotificationsTab() {
  const { 
    notifications, 
    markAsRead, 
    clearNotifications,
    telegramChatId,
    setTelegramChatId,
  } = useDashboardStore()
  
  const [chatIdInput, setChatIdInput] = useState(telegramChatId || '')
  const [isTesting, setIsTesting] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const handleSaveChatId = () => {
    setTelegramChatId(chatIdInput)
    setShowSettings(false)
  }
  
  const handleTestNotification = async () => {
    if (!chatIdInput) return
    
    setIsTesting(true)
    try {
      const response = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: chatIdInput }),
      })
      
      if (response.ok) {
        alert('Test notification sent! Check your Telegram.')
      } else {
        alert('Failed to send test notification. Check your chat ID.')
      }
    } catch (error) {
      alert('Error sending test notification')
    } finally {
      setIsTesting(false)
    }
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return '💡'
    }
  }
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10'
      case 'error':
        return 'border-red-500/20 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10'
      default:
        return 'border-blue-500/20 bg-blue-500/10'
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
          <p className="text-sm text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-xl transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-xl transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Telegram Settings */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Telegram Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Telegram Chat ID
              </label>
              <input
                type="text"
                value={chatIdInput}
                onChange={(e) => setChatIdInput(e.target.value)}
                placeholder="Enter your Telegram chat ID"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                Get your chat ID by messaging @userinfobot on Telegram
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSaveChatId}
                disabled={!chatIdInput}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Save Settings
              </button>
              <button
                onClick={handleTestNotification}
                disabled={!chatIdInput || isTesting}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-gray-600 text-white font-medium rounded-xl transition-colors"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Test
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Notifications List */}
      <div>
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No Notifications
            </h3>
            <p className="text-sm text-gray-400">
              You'll see updates about your vaults here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  border rounded-xl p-4 transition-all
                  ${notification.read 
                    ? 'bg-slate-900/30 border-slate-800' 
                    : getNotificationColor(notification.type)
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm mb-1 ${
                      notification.read ? 'text-gray-400' : 'text-white'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistance(notification.timestamp, new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors flex-shrink-0"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4">
        <p className="text-sm text-purple-300">
          🔔 Enable Telegram notifications to receive alerts when your vault countdown is approaching or when inheritance is distributed.
        </p>
      </div>
    </div>
  )
}
