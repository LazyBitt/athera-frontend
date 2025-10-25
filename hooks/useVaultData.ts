'use client'

import { useReadContract, useAccount } from 'wagmi'
import { FACTORY_ABI, VAULT_ABI } from '../lib/contracts'
import { useState, useEffect } from 'react'

export function useUserVaults() {
  const { address, isConnected } = useAccount()
  const [hasTimedOut, setHasTimedOut] = useState(false)
  
  const { data: vaultAddresses, isLoading, refetch, error, isFetched, isFetching } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'getOwnerVaults',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!isConnected,
      refetchInterval: false, // Disable auto-refetch to prevent infinite loading
      retry: 2,
      retryDelay: 1000,
    }
  })

  // Timeout after 10 seconds
  useEffect(() => {
    if (isLoading && !hasTimedOut) {
      const timeout = setTimeout(() => {
        setHasTimedOut(true)
        console.warn('Vault loading timed out. Check network or contract address.')
      }, 10000)
      
      return () => clearTimeout(timeout)
    }
  }, [isLoading, hasTimedOut])

  // Log for debugging
  useEffect(() => {
    if (error) {
      console.error('Error fetching vaults:', error)
    }
    if (address) {
      console.log('Fetching vaults for:', address)
    }
  }, [error, address])

  // If not connected or no address, return empty immediately
  if (!isConnected || !address) {
    return {
      vaults: [],
      isLoading: false,
      count: 0,
      refetch,
      error: null
    }
  }

  // Use isFetched to determine if initial load is done
  const actuallyLoading = (isLoading || isFetching) && !isFetched && !hasTimedOut

  return {
    vaults: vaultAddresses as `0x${string}`[] | undefined,
    isLoading: actuallyLoading,
    count: vaultAddresses?.length || 0,
    refetch,
    error: hasTimedOut ? new Error('Request timed out') : error
  }
}

export function useVaultInfo(vaultAddress: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: 'getVaultInfo',
    query: {
      enabled: !!vaultAddress,
      refetchInterval: 15000, // Refetch every 15 seconds (less aggressive)
      staleTime: 10000,
    }
  })

  if (!data) {
    return {
      beneficiaries: [],
      percentages: [],
      lastPing: BigInt(0),
      threshold: BigInt(0),
      executed: false,
      balance: BigInt(0),
      timeUntilDistribution: BigInt(0),
      isLoading,
      refetch
    }
  }

  const [beneficiaries, percentages, lastPing, threshold, executed, balance, timeUntilDistribution] = data

  return {
    beneficiaries: beneficiaries as `0x${string}`[],
    percentages: percentages as bigint[],
    lastPing: lastPing as bigint,
    threshold: threshold as bigint,
    executed: executed as boolean,
    balance: balance as bigint,
    timeUntilDistribution: timeUntilDistribution as bigint,
    isLoading,
    refetch
  }
}
