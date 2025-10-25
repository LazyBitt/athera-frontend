'use client'

import { useParams } from 'next/navigation'
import { useReadContract, useWriteContract } from 'wagmi'
import { VAULT_ABI } from '../../../lib/contracts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { formatAddress, formatTimeRemaining, formatBalance, formatPercentage } from '../../../lib/utils'
import { Clock, Users, DollarSign, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function VaultDetailPage() {
  const params = useParams()
  const vaultAddress = params.address as string
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const { writeContract } = useWriteContract()

  const { data: vaultInfo, isLoading } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'getVaultInfo',
  })

  const { data: isReady } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'isReadyForDistribution',
  })

  useEffect(() => {
    if (!vaultInfo) return

    const [, , , , , , timeUntilDistribution] = vaultInfo as readonly [readonly `0x${string}`[], readonly bigint[], bigint, bigint, boolean, bigint, bigint]
    setTimeRemaining(Number(timeUntilDistribution))

    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [vaultInfo])

  const handlePing = () => {
    writeContract({
      address: vaultAddress as `0x${string}`,
      abi: VAULT_ABI,
      functionName: 'ping',
      chain: undefined,
      account: undefined,
    })
  }

  const handleDistribute = () => {
    writeContract({
      address: vaultAddress as `0x${string}`,
      abi: VAULT_ABI,
      functionName: 'distribute',
      chain: undefined,
      account: undefined,
    })
  }

  if (isLoading || !vaultInfo) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const [beneficiaries, percentages, lastPing, threshold, executed, balance] = vaultInfo as readonly [readonly `0x${string}`[], readonly bigint[], bigint, bigint, boolean, bigint, bigint]

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/app" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Vault Details
          </h1>
          <p className="text-gray-600 mt-2">
            {formatAddress(vaultAddress)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Vault Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Balance:</span>
                <span className="font-semibold">{formatBalance(balance)} ETH</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                {executed ? (
                  <span className="text-green-600 font-semibold">✅ Distributed</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">⏳ Active</span>
                )}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Last Ping:</span>
                <span className="text-sm">
                  {new Date(Number(lastPing) * 1000).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Threshold:</span>
                <span className="text-sm">
                  {Math.floor(Number(threshold) / 86400)} days
                </span>
              </div>

              {!executed && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Time Remaining:</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {timeRemaining > 0 ? formatTimeRemaining(timeRemaining) : 'Ready to distribute'}
                  </div>
                </div>
              )}

              {!executed && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handlePing}
                    variant="outline"
                    className="flex-1"
                  >
                    Ping Vault
                  </Button>
                  {isReady && (
                    <Button
                      onClick={handleDistribute}
                      variant="destructive"
                      className="flex-1"
                    >
                      Distribute
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Beneficiaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {beneficiaries.map((beneficiary: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatAddress(beneficiary)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatPercentage(Number(percentages[index]))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatBalance(BigInt(balance) * BigInt(percentages[index]) / BigInt(10000))} ETH
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPercentage(Number(percentages[index]))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Vault Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Vault Address:</span>
                <div className="font-mono text-gray-900 break-all">
                  {vaultAddress}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Explorer:</span>
                <div>
                  <a 
                    href={`https://sepolia.basescan.org/address/${vaultAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    View on BaseScan
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
