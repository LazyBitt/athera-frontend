'use client'

import { useVaultInfo } from '../hooks/useVaultData'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { VAULT_ABI } from '../lib/contracts'
import { formatEther } from 'viem'
import { useState, useEffect } from 'react'
import { Clock, Users, TrendingUp, AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '../store/dashboard'

interface Props {
  vaultAddress: `0x${string}`
  filter: 'all' | 'active' | 'expired'
  onUpdate: () => void
}

export function InheritanceVaultCard({ vaultAddress, filter, onUpdate }: Props) {
  const { 
    beneficiaries, 
    percentages, 
    balance, 
    timeUntilDistribution,
    executed,
    threshold,
    isLoading,
    refetch
  } = useVaultInfo(vaultAddress)
  
  const { addNotification } = useDashboardStore()
  const [timeLeft, setTimeLeft] = useState(Number(timeUntilDistribution))
  
  const { writeContract: ping, data: pingHash, isPending: isPinging } = useWriteContract()
  const { writeContract: distribute, data: distributeHash, isPending: isDistributing } = useWriteContract()
  
  const { isLoading: isPingConfirming } = useWaitForTransactionReceipt({ hash: pingHash })
  const { isLoading: isDistributeConfirming } = useWaitForTransactionReceipt({ hash: distributeHash })
  
  useEffect(() => {
    setTimeLeft(Number(timeUntilDistribution))
    
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [timeUntilDistribution])
  
  const handlePing = async () => {
    try {
      ping({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'ping',
      } as any)
      
      addNotification({
        type: 'info',
        message: 'Checking in to vault...',
      })
      
      setTimeout(() => {
        refetch()
        onUpdate()
      }, 2000)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Check-in failed',
      })
    }
  }
  
  const handleDistribute = async () => {
    try {
      distribute({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'distribute',
      } as any)
      
      addNotification({
        type: 'info',
        message: 'Distributing inheritance...',
      })
      
      setTimeout(() => {
        refetch()
        onUpdate()
      }, 2000)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Distribution failed',
      })
    }
  }
  
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${mins}m`
    if (mins > 0) return `${mins}m ${secs}s`
    return `${secs}s`
  }
  
  const isExpired = timeLeft === 0 && !executed
  const isActive = timeLeft > 0 && !executed
  const isDistributed = executed
  
  // Filter logic
  if (filter === 'active' && !isActive) return null
  if (filter === 'expired' && (!isExpired && !isDistributed)) return null
  
  if (isLoading) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/3"></div>
          <div className="h-8 bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        bg-slate-900/50 border rounded-2xl p-6 transition-all
        ${isExpired ? 'border-red-500/50' : 'border-slate-800'}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <a
              href={`https://sepolia.basescan.org/address/${vaultAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-blue-400 font-mono transition-colors"
              title="View on BaseScan"
            >
              {vaultAddress.slice(0, 10)}...{vaultAddress.slice(-8)} ↗
            </a>
            {executed && (
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                Distributed
              </span>
            )}
            {isExpired && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                Expired
              </span>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {parseFloat(formatEther(balance)).toFixed(4)}
            </span>
            <span className="text-gray-500">ETH</span>
          </div>
        </div>
        
        <div className={`
          p-3 rounded-xl
          ${isExpired ? 'bg-red-500/10' : 'bg-blue-500/10'}
        `}>
          {isExpired ? (
            <AlertCircle className="h-6 w-6 text-red-400" />
          ) : executed ? (
            <CheckCircle className="h-6 w-6 text-green-400" />
          ) : (
            <Clock className="h-6 w-6 text-blue-400" />
          )}
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-500">Time Left</span>
          </div>
          <p className={`text-sm font-medium ${
            isExpired ? 'text-red-400' : 'text-white'
          }`}>
            {executed ? 'Completed' : formatTime(timeLeft)}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-500">Heirs</span>
          </div>
          <p className="text-sm font-medium text-white">
            {beneficiaries.length}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-500">Threshold</span>
          </div>
          <p className="text-sm font-medium text-white">
            {Math.floor(Number(threshold) / 86400)}d
          </p>
        </div>
      </div>
      
      {/* Beneficiaries */}
      <div className="mb-4">
        <h4 className="text-xs text-gray-500 mb-2">Beneficiaries</h4>
        <div className="space-y-2">
          {beneficiaries.map((heir, index) => (
            <div key={heir} className="flex items-center justify-between text-sm">
              <a
                href={`https://sepolia.basescan.org/address/${heir}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 font-mono text-xs transition-colors"
                title="View on BaseScan"
              >
                {heir.slice(0, 8)}...{heir.slice(-6)} ↗
              </a>
              <span className="text-white font-medium">
                {(Number(percentages[index]) / 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        {!executed && isActive && (
          <button
            onClick={handlePing}
            disabled={isPinging || isPingConfirming}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {(isPinging || isPingConfirming) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking in...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Check In
              </>
            )}
          </button>
        )}
        
        {isExpired && !executed && (
          <button
            onClick={handleDistribute}
            disabled={isDistributing || isDistributeConfirming}
            className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-gray-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {(isDistributing || isDistributeConfirming) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Distributing...
              </>
            ) : (
              'Distribute Now'
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}
