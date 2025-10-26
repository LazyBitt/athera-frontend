'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, TrendingUp, Users, Activity } from 'lucide-react'

interface StatProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  icon: any
  delay?: number
}

function AnimatedStat({ end, duration = 2, decimals = 0, prefix = '', suffix = '', label, icon: Icon, delay = 0 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now() + delay * 1000
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      
      if (now < startTime) {
        requestAnimationFrame(updateCount)
        return
      }

      if (now >= endTime) {
        setCount(end)
        return
      }

      const progress = (now - startTime) / (duration * 1000)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = easeOutQuart * end

      setCount(current)
      requestAnimationFrame(updateCount)
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, decimals, isInView, delay])

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group h-full"
    >
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-2">
            {prefix}{displayValue}{suffix}
          </div>
          <div className="text-sm text-gray-400">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function PlatformStats() {
  const stats = [
    {
      end: 1247,
      label: 'Vaults Created',
      icon: Database,
      delay: 0,
    },
    {
      end: 487.3,
      decimals: 1,
      prefix: '$',
      suffix: 'K',
      label: 'Total Value Locked',
      icon: TrendingUp,
      delay: 0.1,
    },
    {
      end: 892,
      label: 'Active Users',
      icon: Users,
      delay: 0.2,
    },
    {
      end: 127,
      label: 'Distributions Completed',
      icon: Activity,
      delay: 0.3,
    },
  ]

  return (
    <section className="pt-16 pb-20 bg-gradient-to-b from-black via-gray-900 to-black border-y border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
