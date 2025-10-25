'use client'

import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { FACTORY_ADDRESS, FACTORY_ABI } from '../lib/contracts'
import { X, Plus, Trash2, Loader2, AlertCircle, Upload, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDashboardStore } from '../store/dashboard'
import { uploadToIPFS } from '../lib/ipfs'

interface Beneficiary {
  address: string
  percentage: string
}

interface Props {
  children: React.ReactNode
  onSuccess: () => void
}

export function CreateInheritanceDialog({ children, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { address: '', percentage: '' }
  ])
  const [amount, setAmount] = useState('')
  const [days, setDays] = useState('30')
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  const { addNotification } = useDashboardStore()
  const { address } = useAccount()
  
  const { writeContract: createVault, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  
  // Get user's vault balance from Factory
  const { data: vaultBalance } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getBalance',
    args: address ? [address] : undefined,
  })
  
  const availableBalance = vaultBalance ? parseFloat(formatEther(vaultBalance as bigint)) : 0
  
  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { address: '', percentage: '' }])
  }
  
  const removeBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index))
  }
  
  const updateBeneficiary = (index: number, field: 'address' | 'percentage', value: string) => {
    const updated = [...beneficiaries]
    updated[index][field] = value
    setBeneficiaries(updated)
  }
  
  const totalPercentage = beneficiaries.reduce((sum, b) => sum + (parseFloat(b.percentage) || 0), 0)
  const requestedAmount = parseFloat(amount) || 0
  const hasInsufficientBalance = requestedAmount > availableBalance
  
  const isValid = 
    beneficiaries.every(b => b.address && b.percentage) &&
    Math.abs(totalPercentage - 100) < 0.01 &&
    amount &&
    requestedAmount > 0 &&
    !hasInsufficientBalance &&
    days &&
    parseFloat(days) > 0
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleCreate = async () => {
    if (!isValid) return
    
    try {
      setIsUploading(true)
      
      // Upload files to IPFS if any
      let ipfsHashes: string[] = []
      if (files.length > 0) {
        addNotification({
          type: 'info',
          message: `Uploading ${files.length} file(s) to IPFS...`,
        })
        
        for (const file of files) {
          const hash = await uploadToIPFS(file)
          ipfsHashes.push(hash)
        }
      }
      
      const addresses = beneficiaries.map(b => b.address as `0x${string}`)
      const percentages = beneficiaries.map(b => BigInt(Math.round(parseFloat(b.percentage) * 100)))
      const thresholdSeconds = BigInt(parseInt(days) * 86400)
      const amountWei = parseEther(amount)
      
      createVault({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createVault',
        args: [addresses, percentages, thresholdSeconds, amountWei],
      } as any)
      
      // Store IPFS hashes in localStorage for demo
      if (ipfsHashes.length > 0) {
        const vaultFiles = JSON.parse(localStorage.getItem('vaultFiles') || '{}')
        vaultFiles[`${address}-${Date.now()}`] = ipfsHashes
        localStorage.setItem('vaultFiles', JSON.stringify(vaultFiles))
      }
      
      addNotification({
        type: 'info',
        message: 'Creating inheritance vault...',
      })
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to create vault',
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  useEffect(() => {
    if (isSuccess && hash) {
      addNotification({
        type: 'success',
        message: 'Inheritance vault created successfully!',
        link: `https://sepolia.basescan.org/tx/${hash}`,
        linkText: 'View on BaseScan',
      })
      
      setTimeout(() => {
        setIsOpen(false)
        onSuccess()
        setBeneficiaries([{ address: '', percentage: '' }])
        setAmount('')
        setDays('30')
        setFiles([])
      }, 1000)
    }
  }, [isSuccess, hash])
  
  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Create Inheritance Vault</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Amount to Lock (ETH)
                      </label>
                      <span className={`text-xs ${availableBalance === 0 ? 'text-red-400' : 'text-gray-500'}`}>
                        Available: {availableBalance.toFixed(4)} ETH
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={availableBalance === 0 ? "Deposit ETH first" : "0.0"}
                        max={availableBalance}
                        disabled={availableBalance === 0}
                        className={`w-full px-4 py-3 pr-16 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          hasInsufficientBalance 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-slate-700 focus:border-blue-500'
                        }`}
                      />
                      {availableBalance > 0 && (
                        <button
                          type="button"
                          onClick={() => setAmount(availableBalance.toString())}
                          className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
                        >
                          MAX
                        </button>
                      )}
                    </div>
                    {hasInsufficientBalance && availableBalance > 0 && (
                      <p className="mt-2 text-xs text-red-400">
                        Insufficient balance. Available: {availableBalance.toFixed(4)} ETH
                      </p>
                    )}
                    {availableBalance === 0 && (
                      <p className="mt-2 text-xs text-yellow-400">
                        Please deposit ETH to your vault first from the Vault tab
                      </p>
                    )}
                  </div>
                  
                  {/* Countdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Countdown Period
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {[
                        { label: '1 Min', days: '0.000694444' },
                        { label: '1 Year', days: '365' },
                        { label: '2 Years', days: '730' },
                        { label: '5 Years', days: '1825' }
                      ].map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setDays(option.days)}
                          disabled={availableBalance === 0}
                          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                            days === option.days
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      placeholder="Custom days"
                      disabled={availableBalance === 0}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {days && parseFloat(days) < 1 
                        ? `${Math.round(parseFloat(days) * 1440)} minutes for testing`
                        : days && `${days} days`}
                    </p>
                  </div>
                  
                  {/* Files Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dokumen & File (Opsional)
                    </label>
                    <div className="space-y-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">
                          Klik atau drag & drop file
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Dokumen, foto, atau file penting lainnya
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          disabled={availableBalance === 0}
                        />
                      </label>
                      
                      {files.length > 0 && (
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
                              <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                              <span className="text-sm text-gray-300 flex-1 truncate">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                              >
                                <X className="h-4 w-4 text-gray-400" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Beneficiaries */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-300">
                        Beneficiaries
                      </label>
                      <button
                        onClick={addBeneficiary}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm text-gray-300 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {beneficiaries.map((beneficiary, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={beneficiary.address}
                              onChange={(e) => updateBeneficiary(index, 'address', e.target.value)}
                              placeholder="0x..."
                              disabled={availableBalance === 0}
                              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={beneficiary.percentage}
                              onChange={(e) => updateBeneficiary(index, 'percentage', e.target.value)}
                              placeholder="%"
                              disabled={availableBalance === 0}
                              className="w-24 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {beneficiaries.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeBeneficiary(index)}
                                disabled={availableBalance === 0}
                                className="p-3 bg-slate-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                          
                          {/* Quick percentage buttons */}
                          <div className="flex gap-1.5 pl-1">
                            {['20', '50', '75', '100'].map((percent) => (
                              <button
                                key={percent}
                                type="button"
                                onClick={() => updateBeneficiary(index, 'percentage', percent)}
                                disabled={availableBalance === 0}
                                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                                  beneficiary.percentage === percent
                                    ? 'bg-violet-600 text-white'
                                    : 'bg-slate-800 text-gray-500 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                }`}
                              >
                                {percent}%
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total percentage:</span>
                      <span className={`font-medium ${
                        Math.abs(totalPercentage - 100) < 0.01 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {totalPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Warning */}
                  {!isValid && (
                    <div className="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-300 space-y-1">
                        {availableBalance === 0 && (
                          <p>• Saldo vault Anda 0. Silakan deposit ETH terlebih dahulu di tab Vault.</p>
                        )}
                        {hasInsufficientBalance && availableBalance > 0 && (
                          <p>• Jumlah melebihi saldo vault (tersedia: {availableBalance.toFixed(4)} ETH)</p>
                        )}
                        {Math.abs(totalPercentage - 100) >= 0.01 && (
                          <p>• Total persentase harus 100%</p>
                        )}
                        {(!amount || requestedAmount <= 0) && availableBalance > 0 && (
                          <p>• Masukkan jumlah yang valid</p>
                        )}
                        {beneficiaries.some(b => !b.address || !b.percentage) && (
                          <p>• Lengkapi semua field beneficiary</p>
                        )}
                        {(!days || parseFloat(days) <= 0) && (
                          <p>• Pilih periode countdown yang valid</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={!isValid || isPending || isConfirming || isUploading}
                      className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading files...
                        </>
                      ) : (isPending || isConfirming) ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Vault'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
