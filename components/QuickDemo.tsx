'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

export function QuickDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  const steps = [
    { title: 'Connect Wallet', time: '5s', icon: '🔗' },
    { title: 'Set Beneficiaries', time: '20s', icon: '👨‍👩‍👧‍👦' },
    { title: 'Choose Countdown', time: '10s', icon: '⏱️' },
    { title: 'Deploy Vault', time: '25s', icon: '🚀' },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105"
      >
        See 60-Second Demo →
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Create Vault in 60 Seconds</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                {steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      i <= step ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-800/50 border border-gray-700'
                    }`}
                  >
                    <div className="text-3xl">{s.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{s.title}</div>
                      <div className="text-sm text-gray-400">{s.time}</div>
                    </div>
                    {i <= step && (
                      <Check className="w-6 h-6 text-green-400" />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (step < steps.length - 1) {
                      setStep(step + 1)
                    } else {
                      setStep(0)
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {step < steps.length - 1 ? 'Next Step' : 'Start Over'}
                </button>
                <a
                  href="/dashboard"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors text-center"
                >
                  Try It Now
                </a>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                No credit card required • Testnet only
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
