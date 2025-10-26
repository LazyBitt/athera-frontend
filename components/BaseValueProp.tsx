'use client'

import { Section } from './Section'
import { motion } from 'framer-motion'
import { Zap, DollarSign, Shield } from 'lucide-react'

export function BaseValueProp() {
  return (
    <Section className="py-24 bg-gradient-to-b from-black to-gray-950 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Build on Base?
          </h2>
          <p className="text-gray-400 text-lg">
            Athera is only possible because of Base's infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ultra-Low Fees</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Ethereum:</span>
                <span className="text-red-400 font-semibold">$50-100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Base:</span>
                <span className="text-green-400 font-semibold">~$2</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Makes inheritance accessible to everyone, not just whales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fast Finality</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Block time:</span>
                <span className="text-cyan-400 font-semibold">2 seconds</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confirmation:</span>
                <span className="text-cyan-400 font-semibold">Instant</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Check-ins and updates happen in real-time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Coinbase Ecosystem</h3>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-400">
                ✓ Smart Wallet support
              </div>
              <div className="text-sm text-gray-400">
                ✓ Basenames integration
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Seamless onboarding for mainstream users
            </p>
          </motion.div>
        </div>

        {/* Comparison */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Cost Comparison
            </h3>
            <p className="text-gray-400">Traditional vs Athera on Base</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-red-500/30 rounded-xl p-6">
              <div className="text-red-400 font-semibold mb-4">Traditional Inheritance</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lawyer fees</span>
                  <span className="text-white">$5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Trust setup</span>
                  <span className="text-white">$3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual maintenance</span>
                  <span className="text-white">$500/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Probate (3-7%)</span>
                  <span className="text-white">$3,000+</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-red-400">Total</span>
                  <span className="text-red-400">$15,000+</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-green-500/30 rounded-xl p-6">
              <div className="text-green-400 font-semibold mb-4">Athera on Base</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Setup fee</span>
                  <span className="text-white">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas fee (Base)</span>
                  <span className="text-white">~$2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Maintenance</span>
                  <span className="text-white">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distribution</span>
                  <span className="text-white">Automatic</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-green-400">Total</span>
                  <span className="text-green-400">~$2</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="text-3xl font-bold text-white mb-2">
              Save $14,998
            </div>
            <div className="text-gray-400 text-sm">
              99.99% cheaper than traditional methods
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
