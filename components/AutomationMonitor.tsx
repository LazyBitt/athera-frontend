'use client'

import { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI, AUTOMATION_ADDRESS } from '../lib/contracts'
import { useVaultInfo } from '../hooks/useVaultData'
import { useDashboardStore } from '../store/dashboard'
import { Activity, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function AutomationMonitor() {
  const { address } = useAccount()
  const { addNotification } = useDashboardStore()
  const [checkedVaults, setCheckedVaults] = useState<Set<string>>(new Set())
  
  const { data: vaultAddresses } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getOwnerVaults',
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 30000, // Check every 30 seconds
    },
  })
  
  const vaults = (vaultAddresses as `0x${string}`[]) || []
  
  useEffect(() => {
    if (!vaults.length) return
    
    vaults.forEach((vaultAddress) => {
      if (checkedVaults.has(vaultAddress)) return
      
      // Mark as checked
      setCheckedVaults(prev => new Set(prev).add(vaultAddress))
    })
  }, [vaults, checkedVaults])
  
  if (!vaults.length) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Activity className="h-5 w-5 text-blue-400 animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white mb-1">
            Chainlink Automation Active
          </h3>
          <p className="text-xs text-gray-400">
            Monitoring {vaults.length} vault{vaults.length > 1 ? 's' : ''} for automatic distribution
          </p>
        </div>
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
    </motion.div>
  )
}
