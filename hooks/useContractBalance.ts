import { useReadContract, useAccount } from 'wagmi'
import { FACTORY_ABI } from '../lib/contracts'

/**
 * Hook to get user's Athera Balance (deposited balance in contract)
 */
export function useContractBalance() {
  const { address } = useAccount()
  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`

  const { data: balance, isLoading, refetch } = useReadContract({
    address: factoryAddress,
    abi: FACTORY_ABI,
    functionName: 'getBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!factoryAddress,
      refetchInterval: 5000, // Auto-refresh every 5 seconds
    },
  })

  return {
    contractBalance: balance || 0n,
    isLoading,
    refetch,
  }
}
