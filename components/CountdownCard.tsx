'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { formatTimeRemaining } from '../lib/utils'

interface CountdownCardProps {
  timeRemaining: number
  isExecuted: boolean
  onPing: () => void
  onDistribute: () => void
  isReady: boolean
}

export function CountdownCard({ 
  timeRemaining, 
  isExecuted, 
  onPing, 
  onDistribute, 
  isReady 
}: CountdownCardProps) {
  const [displayTime, setDisplayTime] = useState(timeRemaining)

  useEffect(() => {
    setDisplayTime(timeRemaining)
    
    const interval = setInterval(() => {
      setDisplayTime(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  const getStatusColor = () => {
    if (isExecuted) return 'text-green-600'
    if (displayTime === 0) return 'text-red-600'
    if (displayTime < 86400) return 'text-yellow-600' // Less than 1 day
    return 'text-gray-600'
  }

  const getStatusIcon = () => {
    if (isExecuted) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (displayTime === 0) return <AlertTriangle className="h-5 w-5 text-red-500" />
    if (displayTime < 86400) return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    return <Clock className="h-5 w-5 text-gray-500" />
  }

  const getStatusText = () => {
    if (isExecuted) return 'Distribution Complete'
    if (displayTime === 0) return 'Ready for Distribution'
    if (displayTime < 86400) return 'Distribution Soon'
    return 'Vault Active'
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-surface border border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          {getStatusIcon()}
          <span>Vault Status</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor()}`}>
            {isExecuted ? '✅ Executed' : displayTime > 0 ? formatTimeRemaining(displayTime) : '⏰ Ready'}
          </div>
          <div className="text-sm text-secondary mt-1">
            {getStatusText()}
          </div>
        </div>

        {!isExecuted && (
          <div className="space-y-3">
            <div className="w-full bg-primary rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  displayTime === 0 ? 'bg-red-500' : 
                  displayTime < 86400 ? 'bg-yellow-500' : 'bg-accent'
                }`}
                style={{ 
                  width: `${Math.max(0, Math.min(100, (displayTime / (7 * 86400)) * 100))}%` 
                }}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={onPing}
                variant="outline"
                className="flex-1"
                disabled={isExecuted}
              >
                Ping Vault
              </Button>
              
              {isReady && (
                <Button
                  onClick={onDistribute}
                  variant="destructive"
                  className="flex-1"
                >
                  Distribute
                </Button>
              )}
            </div>
          </div>
        )}

        {isExecuted && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-green-700">
              All funds have been successfully distributed to beneficiaries.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
