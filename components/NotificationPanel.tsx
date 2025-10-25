'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Bell, Clock, CheckCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface LogEvent {
  id: string
  type: 'vault_created' | 'activity_recorded' | 'distribution_executed' | 'heir_added' | 'allocation_updated'
  message: string
  timestamp: Date
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Vault is being monitored',
      message: 'Your vault is actively monitored for inactivity. All systems operational.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Wallet active — no action required',
      message: 'Recent activity detected from your latest on-chain interaction.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true
    },
    {
      id: '3',
      type: 'warning',
      title: 'Inactivity detected — heirs will be notified',
      message: 'No activity detected for 300+ days. Distribution process may begin soon.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: false
    }
  ])

  const [logEvents] = useState<LogEvent[]>([
    {
      id: '1',
      type: 'vault_created',
      message: 'Vault created successfully',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'heir_added',
      message: 'Heir wallet added: 0x8ba1f...C8C8',
      timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'activity_recorded',
      message: 'Activity recorded: Transaction confirmed',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      type: 'allocation_updated',
      message: 'Allocation percentages updated',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getNotificationBadge = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Success</Badge>
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Warning</Badge>
      case 'error':
        return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Error</Badge>
      default:
        return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Info</Badge>
    }
  }

  const getEventIcon = (type: LogEvent['type']) => {
    switch (type) {
      case 'vault_created':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'activity_recorded':
        return <Clock className="h-3 w-3 text-blue-500" />
      case 'distribution_executed':
        return <AlertTriangle className="h-3 w-3 text-purple-500" />
      case 'heir_added':
        return <CheckCircle className="h-3 w-3 text-emerald-500" />
      case 'allocation_updated':
        return <CheckCircle className="h-3 w-3 text-orange-500" />
      default:
        return <Info className="h-3 w-3 text-gray-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications & Events
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status Messages */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Current Status</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-300">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                Wallet active — no action required
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <Clock className="h-4 w-4 inline mr-2" />
                Vault is being monitored
              </p>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Recent Notifications</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-3 rounded-lg border ${
                    notification.read 
                      ? 'bg-surface/30 border-border/30' 
                      : 'bg-surface/50 border-border/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          {getNotificationBadge(notification.type)}
                        </div>
                        <p className="text-xs text-gray-300">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Event Log */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Event Log</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {logEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-2 bg-gray-900/50 rounded text-sm">
                {getEventIcon(event.type)}
                <div className="flex-1">
                  <p className="text-white">{event.message}</p>
                  <p className="text-xs text-gray-400">
                    {event.timestamp.toLocaleDateString()} at {event.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {notifications.length === 0 && logEvents.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No notifications yet</p>
            <p className="text-sm text-gray-500 mt-1">
              You'll receive updates about your vault status here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


