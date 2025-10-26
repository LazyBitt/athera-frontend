'use client'

import { motion } from 'framer-motion'

export function LiveStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div className="text-4xl font-bold text-blue-400 mb-2">
          $140B+
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wide">Crypto Lost Forever</div>
        <div className="mt-2 text-xs text-gray-500">
          Due to poor inheritance planning
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div className="text-4xl font-bold text-cyan-400 mb-2">
          60 sec
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wide">Setup Time</div>
        <div className="mt-2 text-xs text-gray-500">
          No paperwork required
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div className="text-4xl font-bold text-purple-400 mb-2">
          100%
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wide">Non-Custodial</div>
        <div className="mt-2 text-xs text-gray-500">
          You keep full control
        </div>
      </motion.div>
    </div>
  )
}
