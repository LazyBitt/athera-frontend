'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Activity, Clock, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ActivityData {
  lastTransaction: Date | null
  inactivityThreshold: number // in days
  daysSinceLastActivity: number
  status: 'active' | 'warning' | 'critical' | 'unknown'
  nextCheck: Date
}

export function ActivityStatus() {
  const [activityData, setActivityData] = useState<ActivityData>({
    lastTransaction: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    inactivityThreshold: 365, // 1 year
    daysSinceLastActivity: 15,
    status: 'active',
    nextCheck: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  })

  const [isChecking, setIsChecking] = useState(false)

  const checkActivity = async () => {
    setIsChecking(true)
    
    // Simulate API call to check activity
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock activity check result
    const mockLastTransaction = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    const daysSince = Math.floor((Date.now() - mockLastTransaction.getTime()) / (24 * 60 * 60 * 1000))
    
    let status: ActivityData['status'] = 'active'
    if (daysSince > 300) status = 'critical'
    else if (daysSince > 200) status = 'warning'
    
    setActivityData(prev => ({
      ...prev,
      lastTransaction: mockLastTransaction,
      daysSinceLastActivity: daysSince,
      status,
      nextCheck: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }))
    
    setIsChecking(false)
  }

  const getStatusInfo = () => {
    switch (activityData.status) {
      case 'active':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          message: 'Wallet is active - no action required',
          description: 'Recent activity detected from your latest on-chain interaction'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          message: 'Activity warning - monitor closely',
          description: 'No recent activity detected. Consider interacting with your vault soon.'
        }
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          message: 'Critical inactivity - distribution may trigger',
          description: 'Extended period of inactivity detected. Distribution to heirs may be triggered soon.'
        }
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          message: 'Activity status unknown',
          description: 'Unable to determine wallet activity status'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Check
          </CardTitle>
          <Button
            onClick={checkActivity}
            disabled={isChecking}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'Checking...' : 'Check Activity'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg border ${statusInfo.bgColor} ${statusInfo.borderColor}`}
        >
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
            <div>
              <p className="font-semibold text-white">{statusInfo.message}</p>
              <p className="text-sm text-gray-300">{statusInfo.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Last Transaction</p>
            <p className="font-mono text-sm text-white">
              {activityData.lastTransaction 
                ? activityData.lastTransaction.toLocaleDateString()
                : 'No transactions found'
              }
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Days Since Activity</p>
            <p className="text-sm font-semibold text-white">{activityData.daysSinceLastActivity} days</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Inactivity Threshold</p>
            <p className="text-sm text-white">{activityData.inactivityThreshold} days</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Next Check</p>
            <p className="text-sm text-white">{activityData.nextCheck.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Inactivity Progress</span>
            <span className="text-gray-400">
              {Math.round((activityData.daysSinceLastActivity / activityData.inactivityThreshold) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                activityData.status === 'active' ? 'bg-green-500' :
                activityData.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min((activityData.daysSinceLastActivity / activityData.inactivityThreshold) * 100, 100)}%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {activityData.status !== 'active' && (
          <div className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-300 mb-3">
              Consider taking action to reset your activity timer:
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Ping Vault
              </Button>
              <Button variant="outline" size="sm">
                Make Transaction
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


