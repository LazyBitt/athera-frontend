'use client'

import { useDashboardStore } from '../store/dashboard'
import { formatDistance } from 'date-fns'
import { Activity, ArrowDownToLine, ArrowUpFromLine, Shield, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

export function RecentActivity() {
  const { notifications } = useDashboardStore()
  
  const recentNotifications = notifications.slice(0, 5)
  
  const getIcon = (message: string) => {
    if (message.includes('Deposit')) return ArrowDownToLine
    if (message.includes('Withdraw')) return ArrowUpFromLine
    if (message.includes('vault')) return Shield
    if (message.includes('Inherit')) return Gift
    return Activity
  }
  
  if (recentNotifications.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No recent activity</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentNotifications.map((notification, index) => {
          const Icon = getIcon(notification.message)
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
            >
              <div className={`
                p-2 rounded-lg flex-shrink-0
                ${notification.type === 'success' ? 'bg-green-500/10' : 
                  notification.type === 'error' ? 'bg-red-500/10' : 
                  notification.type === 'warning' ? 'bg-yellow-500/10' : 
                  'bg-blue-500/10'}
              `}>
                <Icon className={`h-4 w-4 ${
                  notification.type === 'success' ? 'text-green-400' : 
                  notification.type === 'error' ? 'text-red-400' : 
                  notification.type === 'warning' ? 'text-yellow-400' : 
                  'text-blue-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistance(notification.timestamp, new Date(), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
