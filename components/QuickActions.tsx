'use client'

import { ArrowDownToLine, Shield, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '../store/dashboard'

export function QuickActions() {
  const { setActiveTab } = useDashboardStore()
  
  const actions = [
    {
      label: 'Deposit Funds',
      icon: ArrowDownToLine,
      color: 'green',
      onClick: () => setActiveTab('vault'),
    },
    {
      label: 'Create Vault',
      icon: Shield,
      color: 'blue',
      onClick: () => setActiveTab('inheritance'),
    },
    {
      label: 'Notifications',
      icon: Settings,
      color: 'orange',
      onClick: () => setActiveTab('notifications'),
    },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={action.onClick}
            className={`
              p-4 bg-slate-900/50 border border-slate-800 rounded-xl
              hover:border-${action.color}-500/50 hover:bg-${action.color}-500/5
              transition-all group
            `}
          >
            <Icon className={`h-6 w-6 text-${action.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
            <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {action.label}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
