'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: Date
  onExpired?: () => void
  className?: string
}

export function CountdownTimer({ targetDate, onExpired, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
        if (onExpired) {
          onExpired()
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onExpired])

  if (isExpired) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <AlertTriangle className="h-4 w-4" />
        <span className="font-semibold">Expired</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="h-4 w-4 text-gray-500" />
      <div className="flex items-center gap-1 text-sm">
        {timeLeft.days > 0 && (
          <span className="bg-gray-100 px-2 py-1 rounded font-mono">
            {timeLeft.days}d
          </span>
        )}
        <span className="bg-gray-100 px-2 py-1 rounded font-mono">
          {timeLeft.hours.toString().padStart(2, '0')}h
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded font-mono">
          {timeLeft.minutes.toString().padStart(2, '0')}m
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded font-mono">
          {timeLeft.seconds.toString().padStart(2, '0')}s
        </span>
      </div>
    </div>
  )
}








