'use client'

import { useState, useEffect, useRef } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { FACTORY_ABI } from '../lib/contracts'
import { useContractBalance } from '../hooks/useContractBalance'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus, X, ChevronDown, AlertCircle } from 'lucide-react'

interface CreateVaultDialogProps {
  children: React.ReactNode
  onSuccess?: () => void
}

interface Beneficiary {
  address: string
  percentage: number
}

const thresholdOptions = [
  { value: 1, label: '1 Minute', seconds: 60 }, // 1 minute = 60 seconds
  { value: 7, label: '1 Week', seconds: 7 * 24 * 60 * 60 },
  { value: 30, label: '1 Month', seconds: 30 * 24 * 60 * 60 },
  { value: 90, label: '3 Months', seconds: 90 * 24 * 60 * 60 },
  { value: 180, label: '6 Months', seconds: 180 * 24 * 60 * 60 },
  { value: 365, label: '1 Year', seconds: 365 * 24 * 60 * 60 },
  { value: 730, label: '2 Years', seconds: 730 * 24 * 60 * 60 },
  { value: 1095, label: '3 Years', seconds: 1095 * 24 * 60 * 60 },
  { value: 1825, label: '5 Years', seconds: 1825 * 24 * 60 * 60 },
]

export function CreateVaultDialog({ children, onSuccess }: CreateVaultDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { address: '', percentage: 0 }
  ])
  const [threshold, setThreshold] = useState(365) // Default to 1 year
  const [initialDeposit, setInitialDeposit] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [error, setError] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { address, chain } = useAccount()
  const { contractBalance, refetch: refetchContractBalance } = useContractBalance()
  const { writeContract, data: hash, isPending, isError, isSuccess, error: writeError } = useWriteContract()
  
  const atheraBalance = parseFloat(formatEther(contractBalance))
  const hasBalance = atheraBalance > 0
  
  // Handle success - close dialog and refetch vaults list
  useEffect(() => {
    if (isSuccess) {
      // Wait a moment to show success message
      setTimeout(() => {
        // Close dialog
        setIsOpen(false)
        setBeneficiaries([{ address: '', percentage: 0 }])
        setInitialDeposit('')
        setError('')
        
        // Refetch contract balance and vaults list
        refetchContractBalance()
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 1000)
        }
      }, 1500) // Show success message for 1.5 seconds
    }
  }, [isSuccess, onSuccess])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { address: '', percentage: 0 }])
  }

  const removeBeneficiary = (index: number) => {
    if (beneficiaries.length > 1) {
      setBeneficiaries(beneficiaries.filter((_, i) => i !== index))
    }
  }

  const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string | number) => {
    const updated = [...beneficiaries]
    updated[index] = { ...updated[index], [field]: value }
    setBeneficiaries(updated)
  }

  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)
  
  // Validate Ethereum address format
  const isValidAddress = (addr: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr)
  }
  
  const isValid = beneficiaries.every(b => 
    isValidAddress(b.address) && b.percentage > 0
  ) && totalPercentage === 100 && initialDeposit && parseFloat(initialDeposit) > 0

  const handleSubmit = () => {
    // Validate addresses
    const invalidAddresses = beneficiaries.filter(b => !isValidAddress(b.address))
    if (invalidAddresses.length > 0) {
      setError('Invalid address format. Address must start with 0x and be 42 characters long.')
      return
    }
    
    if (totalPercentage !== 100) {
      setError('Total percentage must equal 100%')
      return
    }
    
    if (!isValid) {
      setError('Please ensure all beneficiaries have valid addresses and percentages total 100%')
      return
    }

    if (!hasBalance) {
      setError('Your Athera Balance is 0 ETH. Please deposit ETH first using the Balance Manager.')
      return
    }

    if (!initialDeposit || parseFloat(initialDeposit) <= 0) {
      setError('Please enter the amount you want to allocate to this vault.')
      return
    }

    if (parseFloat(initialDeposit) > atheraBalance) {
      setError(`Insufficient Athera Balance. You only have ${atheraBalance.toFixed(4)} ETH available.`)
      return
    }

    // Clear previous errors
    setError('')
    
    try {
      const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`
      
      console.log('Factory address from env:', factoryAddress)
      
      if (!factoryAddress || factoryAddress === '0x...' || factoryAddress === '0x') {
        setError('Factory contract address not configured. Please check your .env.local file.')
        console.error('Factory address is invalid:', factoryAddress)
        return
      }
      
      // Validate factory address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(factoryAddress)) {
        setError(`Invalid factory address format: ${factoryAddress}`)
        console.error('Factory address format is invalid')
        return
      }
      
      console.log('Creating vault with:')
      console.log('- Current network:', chain?.name, 'Chain ID:', chain?.id)
      console.log('- Expected network: Base Sepolia, Chain ID: 84532')
      console.log('- Factory address:', factoryAddress)
      console.log('- Beneficiaries:', beneficiaries)
      console.log('- Threshold:', threshold)
      console.log('- Initial deposit:', initialDeposit, 'ETH')
      
      // Check if on correct network
      if (chain?.id !== 84532) {
        setError(`Wrong network! Please switch to Base Sepolia (Chain ID: 84532). Current network: ${chain?.name} (${chain?.id})`)
        console.error('Wrong network detected')
        return
      }
      
      const addresses = beneficiaries.map(b => b.address as `0x${string}`)
      const percentages = beneficiaries.map(b => BigInt(b.percentage * 100)) // Convert to basis points
      
      // Validate total percentages in basis points
      const totalBasisPoints = percentages.reduce((sum, p) => sum + p, 0n)
      if (totalBasisPoints !== 10000n) {
        setError(`Internal error: Total basis points is ${totalBasisPoints}, should be 10000. Please contact support.`)
        console.error('Basis points validation failed:', totalBasisPoints)
        return
      }

      const selectedOption = thresholdOptions.find(opt => opt.value === threshold)
      const thresholdInSeconds = BigInt(selectedOption?.seconds || 365 * 24 * 60 * 60)
      
      console.log('Contract args:')
      console.log('- Addresses:', addresses)
      console.log('- Percentages (basis points):', percentages.map(p => p.toString()))
      console.log('- Total basis points:', totalBasisPoints.toString())
      console.log('- Threshold (seconds):', thresholdInSeconds.toString())
      console.log('- Value (wei):', parseEther(initialDeposit).toString())
      console.log('- Token address:', '0x0000000000000000000000000000000000000000')
      
      console.log('Calling writeContract with amount from Athera Balance...')
      
      // Create vault using Athera Balance (deposited funds)
      writeContract({
        address: factoryAddress,
        abi: FACTORY_ABI,
        functionName: 'createVault',
        args: [addresses, percentages, thresholdInSeconds, parseEther(initialDeposit)],
      } as any)
      
      console.log('writeContract called successfully')
      
      // Dialog will stay open until transaction succeeds
      // It will close automatically via useEffect when isSuccess = true
    } catch (error) {
      console.error('Error creating vault:', error)
      setError(error instanceof Error ? error.message : 'Failed to create vault')
    }
  }
  
  // Handle error - but don't override if user is retrying
  useEffect(() => {
    if (isError && !isPending && writeError) {
      console.error('Transaction error detected:', writeError)
      console.error('Error name:', writeError.name)
      console.error('Error message:', writeError.message)
      
      let errorMsg = 'Transaction failed. '
      
      if (writeError.message.includes('User rejected')) {
        errorMsg = 'Transaction was rejected by user.'
      } else if (writeError.message.includes('insufficient funds')) {
        errorMsg = 'Insufficient funds for gas + deposit amount.'
      } else if (writeError.message.includes('execution reverted')) {
        errorMsg = 'Contract execution reverted. The factory contract may not be deployed on this network, or there is a validation error.'
      } else if (writeError.message.includes('network')) {
        errorMsg = 'Network error. Please check your connection and make sure you are on Base Sepolia network.'
      } else {
        errorMsg = `Transaction failed: ${writeError.message}`
      }
      
      setError(errorMsg)
    }
  }, [isError, isPending, writeError])
  
  // Clear error when user starts new transaction
  useEffect(() => {
    if (isPending) {
      setError('')
    }
  }, [isPending])

  if (!isOpen) {
    return (
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Create New Vault</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Athera Balance Warning */}
          {!hasBalance && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-400 mb-1">No Athera Balance</p>
                <p className="text-xs text-red-300">
                  Your Athera Balance is 0 ETH. You need to deposit ETH to Athera first before creating a vault.
                  Use the "Deposit" button in Balance Manager to add funds.
                </p>
              </div>
            </div>
          )}
          
          {/* Athera Balance Info */}
          {hasBalance && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-300">Your Athera Balance:</span>
                <span className="text-sm font-bold text-blue-400">{atheraBalance.toFixed(4)} ETH</span>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Inactivity Threshold
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-left flex items-center justify-between text-white"
              >
                <span>{thresholdOptions.find(opt => opt.value === threshold)?.label || 'Select threshold'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  {thresholdOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setThreshold(option.value)
                        setIsDropdownOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-800 focus:bg-gray-800 focus:outline-none text-white"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Vault Amount <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Amount to allocate from your Athera Balance to this vault
            </p>
            <div className="relative">
              <input
                type="number"
                step="0.001"
                placeholder="Enter amount (e.g., 0.1)"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className={`w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-gray-500 ${
                  !initialDeposit || parseFloat(initialDeposit) <= 0 ? 'border-red-500' : 'border-gray-700'
                }`}
                min="0"
                max={atheraBalance}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">ETH</span>
            </div>
            {initialDeposit && parseFloat(initialDeposit) > 0 ? (
              parseFloat(initialDeposit) <= atheraBalance ? (
                <p className="text-xs text-green-400 mt-2">
                  ✓ {initialDeposit} ETH will be allocated to this vault from your Athera Balance
                </p>
              ) : (
                <p className="text-xs text-red-400 mt-2">
                  ⚠ Insufficient Athera Balance. You only have {atheraBalance.toFixed(4)} ETH available.
                </p>
              )
            ) : (
              <p className="text-xs text-gray-400 mt-2">
                Available: {atheraBalance.toFixed(4)} ETH
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-white">
                Beneficiaries
              </label>
              <Button
                onClick={addBeneficiary}
                variant="outline"
                size="sm"
                className="gap-2 border-gray-700 text-white hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Enter valid Ethereum addresses (e.g., 0x742d35Cc6634C0532925a3b844C4b4d8b6...)
            </p>

            <div className="space-y-4">
              {beneficiaries.map((beneficiary, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="0x..."
                      value={beneficiary.address}
                      onChange={(e) => updateBeneficiary(index, 'address', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-gray-500 ${
                        beneficiary.address && !isValidAddress(beneficiary.address)
                          ? 'border-red-500'
                          : 'border-gray-700'
                      }`}
                    />
                    {beneficiary.address && !isValidAddress(beneficiary.address) && (
                      <p className="text-xs text-red-400 mt-1">Invalid address format (must be 0x... 42 chars)</p>
                    )}
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="%"
                      value={beneficiary.percentage || ''}
                      onChange={(e) => updateBeneficiary(index, 'percentage', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-gray-500"
                      min="0"
                      max="100"
                    />
                  </div>
                  {beneficiaries.length > 1 && (
                    <Button
                      onClick={() => removeBeneficiary(index)}
                      variant="ghost"
                      size="sm"
                      className="text-secondary hover:text-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">Total Percentage:</span>
                <span className={`text-sm font-bold ${totalPercentage === 100 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    totalPercentage === 100 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false)
                setError('')
              }}
              className="border-gray-700 text-white hover:bg-gray-800"
              disabled={isPending || isSuccess}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isPending || isSuccess || !hasBalance}
              variant="gold"
            >
              {isSuccess ? '✓ Created!' : isPending ? 'Waiting for confirmation...' : !hasBalance ? 'Insufficient Balance' : 'Create Vault'}
            </Button>
          </div>
          
          {isPending && (
            <p className="text-xs text-blue-400 text-center">
              ⏳ Please confirm the transaction in your wallet...
            </p>
          )}
          
          {isSuccess && (
            <p className="text-xs text-green-400 text-center">
              ✅ Vault created successfully!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
