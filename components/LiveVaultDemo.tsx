'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Clock, Users, DollarSign } from 'lucide-react'

export function LiveVaultDemo() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 23,
    seconds: 45
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const demoVaultAddress = '0xcddc1af8Bb8484076C77090c0bE4443AaDAB389a'
  const baseScanUrl = `https://sepolia.basescan.org/address/${demoVaultAddress}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-semibold">LIVE DEMO VAULT</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Real Vault on Base Sepolia</h3>
          </div>
          <a
            href={baseScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 text-sm transition-colors"
          >
            Verify
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Countdown */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400 text-sm">Distributes in:</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vault Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-400 text-sm">Amount</span>
            </div>
            <div className="text-xl font-bold text-white">0.5 ETH</div>
          </div>
          <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Beneficiaries</span>
            </div>
            <div className="text-xl font-bold text-white">2</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          This vault will automatically distribute funds when countdown reaches zero
        </div>
      </div>
    </motion.div>
  )
}
