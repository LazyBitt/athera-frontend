'use client'

import { useAccount } from 'wagmi'
import { useReadContract } from 'wagmi'
import { FACTORY_ABI } from '../lib/contracts'
import { VaultCardReal } from './VaultCardReal'
import { Card, CardContent } from './ui/card'
import { Loader2 } from 'lucide-react'

export function VaultList() {
  const { address } = useAccount()
  
  const { data: vaultAddresses, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'getOwnerVaults',
    args: address ? [address] : undefined,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    )
  }

  if (!vaultAddresses || vaultAddresses.length === 0) {
    return (
      <Card className="p-12 text-center bg-surface border border-primary">
        <CardContent>
          <div className="text-secondary mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-2">No Vaults Yet</h3>
          <p className="text-secondary">Create your first vault to get started with crypto inheritance.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vaultAddresses.map((vaultAddress) => (
        <VaultCardReal key={vaultAddress} vaultAddress={vaultAddress as `0x${string}`} />
      ))}
    </div>
  )
}
