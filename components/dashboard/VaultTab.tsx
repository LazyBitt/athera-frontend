'use client'

import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { FACTORY_ADDRESS, FACTORY_ABI } from '../../lib/contracts'
import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Loader2, TrendingUp, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '../../store/dashboard'

export function VaultTab() {
  const { address } = useAccount()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedDepositTab, setSelectedDepositTab] = useState<string | null>(null)
  const [selectedWithdrawTab, setSelectedWithdrawTab] = useState<string | null>(null)
  
  const { addNotification } = useDashboardStore()
  
  const { data: walletBalance } = useBalance({ address })
  
  const { data: vaultBalance, refetch: refetchVaultBalance } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })
  
  const { writeContract: deposit, data: depositHash, isPending: isDepositing } = useWriteContract()
  const { writeContract: withdraw, data: withdrawHash, isPending: isWithdrawing } = useWriteContract()
  
  const { isLoading: isDepositConfirming } = useWaitForTransactionReceipt({
    hash: depositHash,
  })
  
  const { isLoading: isWithdrawConfirming } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  })
  
  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return
    
    try {
      deposit({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'deposit',
        value: parseEther(depositAmount),
      } as any)
      
      addNotification({
        type: 'info',
        message: `Depositing ${depositAmount} ETH to vault...`,
      })
      
      setDepositAmount('')
      setTimeout(() => refetchVaultBalance(), 2000)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Deposit failed',
      })
    }
  }
  
  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return
    
    try {
      withdraw({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'withdraw',
        args: [parseEther(withdrawAmount)],
      } as any)
      
      addNotification({
        type: 'info',
        message: `Withdrawing ${withdrawAmount} ETH from vault...`,
      })
      
      setWithdrawAmount('')
      setTimeout(() => refetchVaultBalance(), 2000)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Withdrawal failed',
      })
    }
  }
  
  const vaultBalanceFormatted = vaultBalance ? formatEther(vaultBalance) : '0'
  const walletBalanceFormatted = walletBalance ? formatEther(walletBalance.value) : '0'
  
  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 rounded-xl">
                <Wallet className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400">Wallet Balance</h3>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">
              {parseFloat(walletBalanceFormatted).toFixed(4)}
            </p>
            <p className="text-sm text-gray-500">ETH</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 rounded-xl">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-300">Vault Balance</h3>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">
              {parseFloat(vaultBalanceFormatted).toFixed(4)}
            </p>
            <p className="text-sm text-blue-400">ETH</p>
          </div>
        </motion.div>
      </div>
      
      {/* Deposit & Withdraw */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Deposit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-xl">
              <ArrowDownToLine className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Deposit</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (ETH)</label>
              
              {/* Quick Amount Tabs */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <button
                  onClick={() => {
                    setDepositAmount((parseFloat(walletBalanceFormatted) * 0.2).toFixed(4))
                    setSelectedDepositTab('20')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedDepositTab === '20'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  20%
                </button>
                <button
                  onClick={() => {
                    setDepositAmount((parseFloat(walletBalanceFormatted) * 0.5).toFixed(4))
                    setSelectedDepositTab('50')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedDepositTab === '50'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  50%
                </button>
                <button
                  onClick={() => {
                    setDepositAmount((parseFloat(walletBalanceFormatted) * 0.75).toFixed(4))
                    setSelectedDepositTab('75')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedDepositTab === '75'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  75%
                </button>
                <button
                  onClick={() => {
                    setDepositAmount(parseFloat(walletBalanceFormatted).toFixed(4))
                    setSelectedDepositTab('max')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedDepositTab === 'max'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                  }`}
                >
                  Max
                </button>
              </div>
              
              <input
                type="number"
                step="0.001"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            
            <button
              onClick={handleDeposit}
              disabled={!depositAmount || isDepositing || isDepositConfirming}
              className="w-full px-4 py-3 bg-indigo-600/80 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-gray-500 disabled:shadow-none text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10"
            >
              {(isDepositing || isDepositConfirming) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownToLine className="h-4 w-4" />
                  Deposit to Vault
                </>
              )}
            </button>
          </div>
        </motion.div>
        
        {/* Withdraw */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500/10 rounded-xl">
              <ArrowUpFromLine className="h-5 w-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Withdraw</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (ETH)</label>
              
              {/* Quick Amount Tabs */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <button
                  onClick={() => {
                    setWithdrawAmount((parseFloat(vaultBalanceFormatted) * 0.2).toFixed(4))
                    setSelectedWithdrawTab('20')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedWithdrawTab === '20'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  20%
                </button>
                <button
                  onClick={() => {
                    setWithdrawAmount((parseFloat(vaultBalanceFormatted) * 0.5).toFixed(4))
                    setSelectedWithdrawTab('50')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedWithdrawTab === '50'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  50%
                </button>
                <button
                  onClick={() => {
                    setWithdrawAmount((parseFloat(vaultBalanceFormatted) * 0.75).toFixed(4))
                    setSelectedWithdrawTab('75')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedWithdrawTab === '75'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50'
                  }`}
                >
                  75%
                </button>
                <button
                  onClick={() => {
                    setWithdrawAmount(parseFloat(vaultBalanceFormatted).toFixed(4))
                    setSelectedWithdrawTab('max')
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedWithdrawTab === 'max'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                  }`}
                >
                  Max
                </button>
              </div>
              
              <input
                type="number"
                step="0.001"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
            
            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || isWithdrawing || isWithdrawConfirming}
              className="w-full px-4 py-3 bg-purple-600/80 hover:bg-purple-600 disabled:bg-slate-700 disabled:text-gray-500 disabled:shadow-none text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
            >
              {(isWithdrawing || isWithdrawConfirming) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="h-4 w-4" />
                  Withdraw from Vault
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4"
      >
        <p className="text-sm text-blue-300">
          💡 Your vault balance is used to fund inheritance vaults. Deposit funds here before creating new vaults.
        </p>
      </motion.div>
    </div>
  )
}
