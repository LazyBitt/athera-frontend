'use client'

import { useState, useEffect } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDownToLine, ArrowUpFromLine, Wallet } from 'lucide-react'
import { useContractBalance } from '../hooks/useContractBalance'
import { FACTORY_ABI } from '../lib/contracts'
import { useNotifications } from './NotificationSystem'

export function BalanceManager() {
  const { address } = useAccount()
  const { data: walletBalance } = useBalance({ address })
  const { contractBalance, refetch: refetchContractBalance } = useContractBalance()
  const { addNotification } = useNotifications()

  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`

  // Deposit transaction
  const { writeContract: deposit, data: depositHash, isPending: isDepositing } = useWriteContract()
  const { isSuccess: depositSuccess } = useWaitForTransactionReceipt({ hash: depositHash })

  // Withdraw transaction
  const { writeContract: withdraw, data: withdrawHash, isPending: isWithdrawing } = useWriteContract()
  const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash })

  // Handle deposit success
  useEffect(() => {
    if (depositSuccess) {
      addNotification({
        type: 'success',
        title: 'Deposit Successful',
        message: `${depositAmount} ETH deposited to Athera Balance`
      })
      setDepositAmount('')
      setShowDeposit(false)
      refetchContractBalance()
    }
  }, [depositSuccess])

  // Handle withdraw success
  useEffect(() => {
    if (withdrawSuccess) {
      addNotification({
        type: 'success',
        title: 'Withdrawal Successful',
        message: `${withdrawAmount} ETH withdrawn to your wallet`
      })
      setWithdrawAmount('')
      setShowWithdraw(false)
      refetchContractBalance()
    }
  }, [withdrawSuccess])

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      addNotification({
        type: 'warning',
        title: 'Invalid Amount',
        message: 'Please enter a valid deposit amount'
      })
      return
    }

    const walletBal = walletBalance ? parseFloat(formatEther(walletBalance.value)) : 0
    if (parseFloat(depositAmount) > walletBal) {
      addNotification({
        type: 'error',
        title: 'Insufficient Wallet Balance',
        message: `You only have ${walletBal.toFixed(4)} ETH in your wallet`
      })
      return
    }

    try {
      const value = parseEther(depositAmount)
      deposit({
        address: factoryAddress,
        abi: FACTORY_ABI,
        functionName: 'deposit',
        value,
      } as any)
    } catch (error) {
      console.error('Deposit error:', error)
      addNotification({
        type: 'error',
        title: 'Deposit Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      addNotification({
        type: 'warning',
        title: 'Invalid Amount',
        message: 'Please enter a valid withdrawal amount'
      })
      return
    }

    const contractBal = parseFloat(formatEther(contractBalance))
    if (parseFloat(withdrawAmount) > contractBal) {
      addNotification({
        type: 'error',
        title: 'Insufficient Athera Balance',
        message: `You only have ${contractBal.toFixed(4)} ETH in Athera Balance`
      })
      return
    }

    try {
      withdraw({
        address: factoryAddress,
        abi: FACTORY_ABI,
        functionName: 'withdraw',
        args: [parseEther(withdrawAmount)],
      } as any)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Withdrawal Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return (
    <Card className="border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet className="h-5 w-5 text-blue-400" />
          Balance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Balance */}
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Wallet Balance</span>
            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">Read-only</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {walletBalance ? parseFloat(formatEther(walletBalance.value)).toFixed(4) : '0.0000'} ETH
          </div>
          <p className="text-xs text-gray-500 mt-1">Your MetaMask wallet balance</p>
        </div>

        {/* Athera Balance */}
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-300">Athera Balance</span>
            <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Available for vaults</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {parseFloat(formatEther(contractBalance)).toFixed(4)} ETH
          </div>
          <p className="text-xs text-gray-400 mt-1">Deposited in Athera contract</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setShowDeposit(!showDeposit)
              setShowWithdraw(false)
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Deposit
          </button>
          <button
            onClick={() => {
              setShowWithdraw(!showWithdraw)
              setShowDeposit(false)
            }}
            disabled={contractBalance === 0n}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUpFromLine className="h-4 w-4" />
            Withdraw
          </button>
        </div>

        {/* Deposit Form */}
        {showDeposit && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-300 mb-3">Deposit ETH to Athera Balance</p>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.001"
                placeholder="Amount in ETH"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:outline-none focus:border-green-500"
                disabled={isDepositing}
              />
              <button
                onClick={handleDeposit}
                disabled={isDepositing}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isDepositing ? 'Depositing...' : 'Deposit'}
              </button>
            </div>
          </div>
        )}

        {/* Withdraw Form */}
        {showWithdraw && (
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-sm text-orange-300 mb-3">Withdraw ETH to your wallet</p>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.001"
                placeholder="Amount in ETH"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:outline-none focus:border-orange-500"
                disabled={isWithdrawing}
              />
              <button
                onClick={handleWithdraw}
                disabled={isWithdrawing}
                className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
              >
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-gray-400">
            💡 <span className="text-blue-300">Tip:</span> Deposit ETH to Athera Balance first before creating inheritance vaults. Only funds in Athera Balance can be used for vaults.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
