'use client'

import { useAccount, useReadContract } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI } from '../../lib/contracts'
import { InheritanceVaultCard } from '../../components/InheritanceVaultCard'
import { CreateInheritanceDialog } from '../../components/CreateInheritanceDialog'
import { Plus, Shield, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function InheritanceTab() {
  const { address } = useAccount()
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all')
  
  const { data: vaultAddresses, isLoading, refetch } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getOwnerVaults',
    args: address ? [address] : undefined,
  })
  
  const vaults = (vaultAddresses as `0x${string}`[]) || []
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Inheritance Vaults</h2>
          <p className="text-sm text-gray-400">
            Create and manage vaults that automatically distribute to your heirs
          </p>
        </div>
        
        <CreateInheritanceDialog onSuccess={refetch}>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-500/20">
            <Plus className="h-4 w-4" />
            Create Vault
          </button>
        </CreateInheritanceDialog>
      </div>
      
      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
            filter === 'active'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('expired')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
            filter === 'expired'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Expired
        </button>
      </div>
      
      {/* Vaults List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
            <p className="text-gray-400">Loading vaults...</p>
          </div>
        ) : vaults.length > 0 ? (
          vaults.map((vaultAddress, index) => (
            <motion.div
              key={vaultAddress}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InheritanceVaultCard 
                vaultAddress={vaultAddress}
                filter={filter}
                onUpdate={refetch}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="mb-6">
              <Shield className="h-16 w-16 text-gray-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Inheritance Vaults Yet
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Create your first inheritance vault to secure your digital assets for your loved ones
            </p>
            <CreateInheritanceDialog onSuccess={refetch}>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                Create Your First Vault
              </button>
            </CreateInheritanceDialog>
          </motion.div>
        )}
      </div>
      
      {/* Info Box */}
      {vaults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4"
        >
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-purple-300">
              <p className="font-medium">How it works:</p>
              <ul className="space-y-1 text-purple-300/80">
                <li>• Check in regularly to reset the countdown timer</li>
                <li>• If you don't check in before the deadline, funds automatically distribute to heirs</li>
                <li>• You can update beneficiaries and percentages anytime</li>
                <li>• Emergency withdraw is available if needed</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
