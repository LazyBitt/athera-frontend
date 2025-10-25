'use client'

import { useAccount, useBalance, useBlockNumber } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Wallet, Activity, Clock, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'

interface WalletActivity {
  lastTransaction: Date | null
  isActive: boolean
  status: 'active' | 'inactive' | 'unknown'
}

export function WalletOverview() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: blockNumber } = useBlockNumber()
  const [activity, setActivity] = useState<WalletActivity>({
    lastTransaction: null,
    isActive: false,
    status: 'unknown'
  })

  // Mock activity check - in production, this would call Etherscan API
  useEffect(() => {
    if (address) {
      // Simulate activity check
      const mockLastTransaction = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
      const isActive = Date.now() - mockLastTransaction.getTime() < 365 * 24 * 60 * 60 * 1000 // 1 year
      
      setActivity({
        lastTransaction: mockLastTransaction,
        isActive,
        status: isActive ? 'active' : 'inactive'
      })
    }
  }, [address])

  const getStatusBadge = () => {
    switch (activity.status) {
      case 'active':
        return (
          <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
            🟢 Active
          </Badge>
        )
      case 'inactive':
        return (
          <Badge className="bg-red-500/20 text-red-600 border-red-500/30">
            🔴 Inactive
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-600 border-gray-500/30">
            ⚪ Unknown
          </Badge>
        )
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected || !address) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Connect your wallet to view overview
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Address */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Connected Wallet</p>
            <p className="font-mono text-sm">{formatAddress(address)}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Balance */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">ETH Balance</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000'} ETH
            </span>
          </div>
        </div>

        {/* Activity Status */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Activity Status</p>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {activity.lastTransaction 
                ? `Last transaction: ${activity.lastTransaction.toLocaleDateString()}`
                : 'No recent activity'
              }
            </span>
          </div>
          {activity.status === 'active' && (
            <p className="text-xs text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded">
              Activity detected from your latest on-chain interaction
            </p>
          )}
        </div>

        {/* Block Number */}
        {blockNumber && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Current block: {blockNumber.toString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


