'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Lock, Unlock, Coins } from 'lucide-react'

interface AnimatedVaultProps {
  isExecuted: boolean
  balance: bigint
  beneficiaries: string[]
  percentages: number[]
}

export function AnimatedVault({ isExecuted, balance, beneficiaries, percentages }: AnimatedVaultProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isExecuted && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }, [isExecuted, isAnimating])

  return (
    <div className="relative">
      <motion.div
        animate={isAnimating ? {
          scale: [1, 1.1, 1],
          rotateY: [0, 10, 0],
          boxShadow: [
            "0 0 0 rgba(255, 215, 0, 0)",
            "0 0 20px rgba(255, 215, 0, 0.5)",
            "0 0 0 rgba(255, 215, 0, 0)"
          ]
        } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative"
      >
        <Card className={`transition-all duration-500 ${isExecuted ? 'vault-glow' : ''}`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={isExecuted ? { rotate: 360 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
              >
                {isExecuted ? (
                  <Unlock className="h-16 w-16 text-green-500" />
                ) : (
                  <Lock className="h-16 w-16 text-gray-400" />
                )}
              </motion.div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isExecuted ? 'Vault Opened' : 'Vault Locked'}
              </h3>
              <p className="text-gray-600">
                {isExecuted 
                  ? 'Funds have been distributed to beneficiaries' 
                  : 'Funds are securely locked until distribution'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Total Balance</span>
                </div>
                <span className="font-semibold">
                  {(Number(balance) / 1e18).toFixed(4)} ETH
                </span>
              </div>

              {isExecuted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <h4 className="font-semibold text-gray-900">Distribution Summary</h4>
                  {beneficiaries.map((beneficiary, index) => (
                    <motion.div
                      key={beneficiary}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-2 bg-green-50 rounded"
                    >
                      <span className="text-sm text-gray-700">
                        {beneficiary.slice(0, 6)}...{beneficiary.slice(-4)}
                      </span>
                      <span className="text-sm font-semibold text-green-700">
                        {((Number(balance) / 1e18) * percentages[index] / 10000).toFixed(4)} ETH
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-yellow-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}




