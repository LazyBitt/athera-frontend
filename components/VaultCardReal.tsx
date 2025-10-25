'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Shield, Clock, CheckCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { useVaultInfo } from '../hooks/useVaultData'
import { VAULT_ABI } from '../lib/contracts'
import { useNotifications } from './NotificationSystem'

interface VaultCardRealProps {
  vaultAddress: `0x${string}`
  filter?: 'all' | 'active' | 'released' | 'history'
}

export function VaultCardReal({ vaultAddress, filter = 'all' }: VaultCardRealProps) {
  const { addNotification } = useNotifications()
  const vaultInfo = useVaultInfo(vaultAddress)
  const [currentTime, setCurrentTime] = useState(0) // Start with 0 to avoid hydration mismatch
  const [showDeposit, setShowDeposit] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')
  const [showEditHeirs, setShowEditHeirs] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Initialize time on mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setCurrentTime(Date.now())
  }, [])

  // Ping transaction
  const { writeContract: pingVault, data: pingHash, isPending: isPinging } = useWriteContract()
  const { isSuccess: pingSuccess } = useWaitForTransactionReceipt({ hash: pingHash })

  // Deposit transaction
  const { sendTransaction, data: depositHash, isPending: isDepositing } = useSendTransaction()
  const { isSuccess: depositSuccess } = useWaitForTransactionReceipt({ hash: depositHash })

  // Distribute transaction
  const { writeContract: distributeVault, data: distributeHash, isPending: isDistributing } = useWriteContract()
  const { isSuccess: distributeSuccess } = useWaitForTransactionReceipt({ hash: distributeHash })

  // Cancel/Emergency Withdraw transaction
  const { writeContract: cancelVault, data: cancelHash, isPending: isCanceling } = useWriteContract()
  const { isSuccess: cancelSuccess } = useWaitForTransactionReceipt({ hash: cancelHash })

  // Update time every second (only after mount)
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [mounted])

  // Handle ping success
  useEffect(() => {
    if (pingSuccess) {
      addNotification({
        type: 'success',
        title: 'Vault Pinged',
        message: 'Inactivity timer has been reset'
      })
      vaultInfo.refetch()
    }
  }, [pingSuccess])

  // Handle deposit success
  useEffect(() => {
    if (depositSuccess) {
      addNotification({
        type: 'success',
        title: 'Deposit Successful',
        message: `${depositAmount} ETH deposited to vault`
      })
      setDepositAmount('')
      setShowDeposit(false)
      vaultInfo.refetch()
    }
  }, [depositSuccess])

  // Handle distribute success
  useEffect(() => {
    if (distributeSuccess) {
      addNotification({
        type: 'success',
        title: 'Distribution Complete',
        message: 'Funds have been sent to beneficiaries'
      })
      vaultInfo.refetch()
    }
  }, [distributeSuccess])

  // Handle cancel success
  useEffect(() => {
    if (cancelSuccess) {
      addNotification({
        type: 'success',
        title: 'Vault Canceled',
        message: 'All funds have been withdrawn back to your wallet'
      })
      vaultInfo.refetch()
    }
  }, [cancelSuccess])

  const handlePing = () => {
    try {
      pingVault({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'ping',
      } as any)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Ping Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      addNotification({
        type: 'warning',
        title: 'Invalid Amount',
        message: 'Please enter a valid deposit amount'
      })
      return
    }

    try {
      sendTransaction({
        to: vaultAddress,
        value: parseEther(depositAmount),
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Deposit Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleDistribute = () => {
    if (vaultInfo.timeUntilDistribution > 0n) {
      addNotification({
        type: 'warning',
        title: 'Cannot Distribute',
        message: 'Inactivity period has not been reached yet'
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
        title: 'Distribution Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleCancel = () => {
    if (vaultInfo.executed) {
      addNotification({
        type: 'warning',
        title: 'Cannot Cancel',
        message: 'Vault has already been distributed'
      })
      return
    }

    if (!confirm('Are you sure you want to cancel this vault? All funds will be returned to your wallet.')) {
      return
    }

    try {
      cancelVault({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'emergencyWithdraw',
      } as any)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Cancel Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const timeRemaining = Number(vaultInfo.timeUntilDistribution) * 1000

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const isCanceled = vaultInfo.balance === 0n && !vaultInfo.executed

  const getStatusBadge = () => {
    if (isCanceled) {
      return (
        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
          <X className="h-3 w-3 mr-1" />
          Canceled
        </Badge>
      )
    }
    if (vaultInfo.executed) {
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Released
        </Badge>
      )
    }
    if (timeRemaining <= 0) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <Clock className="h-3 w-3 mr-1" />
          Ready
        </Badge>
      )
    }
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        <Shield className="h-3 w-3 mr-1" />
        Active
      </Badge>
    )
  }

  // Filter logic
  // Active: vault is not executed and not canceled
  if (filter === 'active' && (vaultInfo.executed || isCanceled)) return null
  
  // Released: vault has been executed (distributed)
  if (filter === 'released' && !vaultInfo.executed) return null
  
  // History: only canceled vaults
  if (filter === 'history' && !isCanceled) return null

  if (vaultInfo.isLoading) {
    return (
      <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-blue-400" />
            Vault
          </CardTitle>
          {getStatusBadge()}
        </div>
        {!vaultInfo.executed && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setShowEditHeirs(!showEditHeirs)}
              className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              {showEditHeirs ? 'Cancel Edit' : 'Edit Heirs'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isCanceling}
              className="px-3 py-1.5 bg-red-600/20 text-red-400 text-xs rounded-lg hover:bg-red-600/30 transition-colors border border-red-500/30 disabled:opacity-50"
            >
              {isCanceling ? 'Canceling...' : 'Cancel Vault'}
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Canceled Message */}
        {isCanceled && (
          <div className="p-4 bg-gray-500/10 border border-gray-500/30 rounded-lg">
            <p className="text-sm font-medium text-gray-300 text-center mb-1">
              Vault Canceled
            </p>
            <p className="text-xs text-gray-400 text-center">
              All funds have been withdrawn back to your wallet
            </p>
          </div>
        )}

        {/* Countdown Timer */}
        {!isCanceled && (
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Time until distribution</span>
            </div>
            <button 
              onClick={handlePing}
              disabled={isPinging || vaultInfo.executed}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPinging ? 'Resetting...' : 'Reset Timer'}
            </button>
          </div>
          
          {timeRemaining > 0 && !vaultInfo.executed ? (
            <div className="grid grid-cols-4 gap-4 mb-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {String(Math.floor(timeRemaining / (24 * 60 * 60 * 1000))).padStart(3, '0')}
                </div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {String(Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {String(Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {String(Math.floor((timeRemaining % (60 * 1000)) / 1000)).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400">Seconds</div>
              </div>
            </div>
          ) : vaultInfo.executed ? (
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-blue-400 mb-2">✅ Distributed</p>
              <p className="text-sm text-gray-400">Funds have been sent to beneficiaries</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-yellow-400 mb-2">⏰ Ready for distribution</p>
              <p className="text-sm text-gray-400 mb-3">
                Chainlink Automation will distribute automatically, or execute manually:
              </p>
              <button 
                onClick={handleDistribute}
                disabled={isDistributing}
                className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors"
              >
                {isDistributing ? 'Distributing...' : 'Execute Now (Manual)'}
              </button>
            </div>
          )}
          
          <p className="text-xs text-gray-400 mt-3">
            Last check-in: {new Date(Number(vaultInfo.lastPing) * 1000).toLocaleString()}
          </p>
        </div>
        )}

        {/* Vault Balance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Vault Balance</p>
              <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
                Protected funds
              </span>
            </div>
            <button 
              onClick={() => setShowDeposit(!showDeposit)}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              {showDeposit ? 'Cancel' : '+ Add Funds'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">
              {parseFloat(formatEther(vaultInfo.balance)).toFixed(4)} ETH
            </span>
          </div>
          <p className="text-xs text-gray-500">
            This amount will be distributed to heirs when countdown reaches 0
          </p>
          
          {showDeposit && (
            <div className="mt-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Send ETH to your vault</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.001"
                  placeholder="Amount in ETH"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={isDepositing}
                />
                <button 
                  onClick={handleDeposit}
                  disabled={isDepositing}
                  className="px-4 py-2 bg-white text-black text-sm rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDepositing ? 'Sending...' : 'Deposit'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vault Address */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Vault Address</p>
          <p className="font-mono text-sm text-white">{formatAddress(vaultAddress)}</p>
        </div>

        {/* Heirs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Heirs</p>
            {!vaultInfo.executed && !showEditHeirs && (
              <button
                onClick={() => setShowEditHeirs(true)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
          
          {!showEditHeirs ? (
            // Display mode
            vaultInfo.beneficiaries.map((heir, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <span className="font-mono text-sm text-white">{formatAddress(heir)}</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                  {Number(vaultInfo.percentages[index]) / 100}%
                </Badge>
              </div>
            ))
          ) : (
            // Edit mode
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <p className="text-xs text-yellow-400 mb-3">
                ⚠ Editing heirs requires a blockchain transaction. Make sure percentages total 100%.
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Feature coming soon: Edit beneficiaries interface
              </p>
              <button
                onClick={() => setShowEditHeirs(false)}
                className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
