'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Gift, Clock, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { useVaultInfo } from '../hooks/useVaultData'
import { VAULT_ABI } from '../lib/contracts'
import { useNotifications } from './NotificationSystem'

interface HeirVaultCardProps {
  vaultAddress: `0x${string}`
}

export function HeirVaultCard({ vaultAddress }: HeirVaultCardProps) {
  const { addNotification } = useNotifications()
  const vaultInfo = useVaultInfo(vaultAddress)
  const [currentTime, setCurrentTime] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setCurrentTime(Date.now())
  }, [])

  // Distribute transaction
  const { writeContract: distributeVault, data: distributeHash, isPending: isDistributing } = useWriteContract()
  const { isSuccess: distributeSuccess } = useWaitForTransactionReceipt({ hash: distributeHash })

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    if (distributeSuccess) {
      addNotification({
        type: 'success',
        title: 'Inheritance Claimed',
        message: 'Your inheritance has been transferred to your wallet'
      })
      vaultInfo.refetch()
    }
  }, [distributeSuccess])

  const handleClaim = () => {
    if (vaultInfo.timeUntilDistribution > 0n) {
      addNotification({
        type: 'warning',
        title: 'Cannot Claim Yet',
        message: 'The inactivity period has not been reached yet'
      })
      return
    }

    try {
      distributeVault({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'distribute',
      } as any)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Claim Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const timeRemaining = Number(vaultInfo.timeUntilDistribution) * 1000
  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const getStatusBadge = () => {
    if (vaultInfo.executed) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Claimed
        </Badge>
      )
    }
    if (timeRemaining <= 0) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <Clock className="h-3 w-3 mr-1" />
          Ready to Claim
        </Badge>
      )
    }
    return (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    )
  }

  if (vaultInfo.isLoading) {
    return (
      <Card className="border border-gray-800 bg-gray-900/50">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-800 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-800 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Gift className="h-5 w-5 text-purple-400" />
            Inheritance Vault
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inheritance Amount */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-300 mb-2">Your Inheritance Amount</p>
          <div className="text-3xl font-bold text-white">
            {parseFloat(formatEther(vaultInfo.balance)).toFixed(4)} ETH
          </div>
        </div>

        {/* Countdown or Claim */}
        {!vaultInfo.executed && (
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
            {timeRemaining > 0 ? (
              <>
                <p className="text-sm text-purple-300 mb-3">Time until you can claim</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {String(Math.floor(timeRemaining / (24 * 60 * 60 * 1000))).padStart(3, '0')}
                    </div>
                    <div className="text-xs text-gray-400">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {String(Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-400">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {String(Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {String(Math.floor((timeRemaining % (60 * 1000)) / 1000)).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-400">Seconds</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  The owner is still active. You can claim after the inactivity period expires.
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl font-bold text-yellow-400 mb-2">🎁 Ready for Distribution!</p>
                <p className="text-sm text-gray-400 mb-4">
                  Chainlink Automation will automatically distribute this inheritance soon.
                  Or you can claim it manually now:
                </p>
                <button 
                  onClick={handleClaim}
                  disabled={isDistributing}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
                >
                  {isDistributing ? 'Claiming...' : 'Claim Now (Manual)'}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  💡 No need to rush - it will be distributed automatically
                </p>
              </div>
            )}
          </div>
        )}

        {vaultInfo.executed && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <p className="text-lg font-bold text-green-400 mb-2">✅ Inheritance Claimed</p>
            <p className="text-sm text-gray-400">
              The funds have been transferred to your wallet
            </p>
          </div>
        )}

        {/* Vault Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Vault Address:</span>
            <span className="text-white font-mono">{formatAddress(vaultAddress)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Owner Activity:</span>
            <span className="text-white">{new Date(Number(vaultInfo.lastPing) * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
