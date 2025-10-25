'use client'

import { useAccount, useReadContract } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI } from '../lib/contracts'
import { Shield, TrendingUp, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function VaultStats() {
  const { address } = useAccount()
  
  const { data: vaultAddresses } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getOwnerVaults',
    args: address ? [address] : undefined,
  })
  
  const vaultCount = (vaultAddresses as any[])?.length || 0
  
  const stats = [
    {
      label: 'Active Vaults',
      value: vaultCount,
      icon: Shield,
      color: 'blue',
    },
    {
      label: 'Total Value',
      value: '0.00',
      suffix: 'ETH',
      icon: TrendingUp,
      color: 'green',
    },
    {
      label: 'Beneficiaries',
      value: '0',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Avg. Countdown',
      value: '30',
      suffix: 'days',
      icon: Clock,
      color: 'orange',
    },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <Icon className={`h-4 w-4 text-${stat.color}-400`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {stat.value}
                {stat.suffix && <span className="text-sm text-gray-500 ml-1">{stat.suffix}</span>}
              </p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
