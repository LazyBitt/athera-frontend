'use client'

import { useAccount, useBalance, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Navbar } from '../../components/Navbar'
import { WalletOverview } from '../../components/WalletOverview'
import { VaultCardReal } from '../../components/VaultCardReal'
import { HeirVaultCard } from '../../components/HeirVaultCard'
import { HeirTable } from '../../components/HeirTable'
import { ActivityStatus } from '../../components/ActivityStatus'
import { NotificationPanel } from '../../components/NotificationPanel'
import { CreateVaultDialog } from '../../components/CreateVaultDialog'
import { BalanceManager } from '../../components/BalanceManager'
import { useUserVaults } from '../../hooks/useVaultData'
import { FACTORY_ABI } from '../../lib/contracts'
import { Button } from '../../components/ui/button'
import { Plus, Wallet, Settings, Moon, Sun, Shield, Users, Clock, Gift } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'my-vaults' | 'inheritance'>('my-vaults')
  const [filter, setFilter] = useState<'all' | 'active' | 'released' | 'history'>('all')
  
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })
  const { vaults, isLoading: vaultsLoading, count, refetch } = useUserVaults()
  
  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`
  
  // Get all vaults for inheritance tab
  const { data: allVaults, isLoading: allVaultsLoading } = useReadContract({
    address: factoryAddress,
    abi: FACTORY_ABI,
    functionName: 'getAllVaults',
    query: {
      enabled: !!factoryAddress && isConnected && activeTab === 'inheritance',
    },
  })
  
  const heirVaults = allVaults as `0x${string}`[] || []
  const hasVaults = !vaultsLoading && vaults && vaults.length > 0
  
  // Fix hydration by ensuring client-only rendering
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center py-8 text-gray-400">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-white">
                Connect Your Wallet
              </h1>
              <p className="text-xl mb-8 text-gray-400">
                Connect your wallet to access your crypto inheritance vault
              </p>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-full"
                            >
                              Connect Wallet
                            </button>
                          )
                        }

                        return (
                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-full"
                          >
                            {account.displayName}
                          </button>
                        )
                      })()}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => refetch()}
                className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 rounded-lg"
                title="Refresh vaults"
              >
                ↻
              </button>
              {activeTab === 'my-vaults' && (
                <CreateVaultDialog onSuccess={refetch}>
                  <button className="px-4 py-2 bg-white text-black text-sm hover:bg-gray-100 rounded-lg">
                    New vault
                  </button>
                </CreateVaultDialog>
              )}
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex gap-2 mb-8 pb-6 border-b border-gray-900">
            <button
              onClick={() => setActiveTab('my-vaults')}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'my-vaults'
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="h-4 w-4" />
              My Vaults
            </button>
            <button
              onClick={() => setActiveTab('inheritance')}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'inheritance'
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              <Gift className="h-4 w-4" />
              Inheritance
            </button>
          </div>

          {/* My Vaults Tab Content */}
          {activeTab === 'my-vaults' && (
            <>
              {/* Balance Manager */}
              <div className="mb-8">
                <BalanceManager />
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-8 pb-6 border-b border-gray-900 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Vaults </span>
                    <span className="text-white font-medium">{vaultsLoading ? '...' : count}</span>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === 'all'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  All Vaults
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === 'active'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('released')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === 'released'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  Released
                </button>
                <button
                  onClick={() => setFilter('history')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === 'history'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  History
                </button>
              </div>

              {/* Vaults List */}
              <div className="space-y-4">
                {!isConnected ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="mb-4">Please connect your wallet</p>
                  </div>
                ) : vaultsLoading ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">Loading vaults...</div>
                    <p className="text-xs text-gray-600">
                      If this takes too long, check your network connection or try refreshing
                    </p>
                  </div>
                ) : vaults && vaults.length > 0 ? (
                  vaults.map((vaultAddress) => (
                    <VaultCardReal 
                      key={vaultAddress} 
                      vaultAddress={vaultAddress}
                      filter={filter}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p className="mb-4">No vaults found</p>
                    <CreateVaultDialog onSuccess={refetch}>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                        Create your first vault
                      </button>
                    </CreateVaultDialog>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Inheritance Tab Content */}
          {activeTab === 'inheritance' && (
            <>
              <div className="mb-6">
                <p className="text-sm text-gray-400">
                  Vaults where you are listed as a beneficiary
                </p>
              </div>

              {/* Vaults List */}
              <div className="space-y-4">
                {allVaultsLoading ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">Loading inheritance vaults...</div>
                  </div>
                ) : heirVaults && heirVaults.length > 0 ? (
                  heirVaults.map((vaultAddress) => (
                    <HeirVaultCard 
                      key={vaultAddress} 
                      vaultAddress={vaultAddress}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Gift className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No inheritance vaults found</p>
                    <p className="text-sm text-gray-500">
                      You are not listed as a beneficiary in any vaults yet
                    </p>
                  </div>
                )}
              </div>

              {/* Info Boxes */}
              {heirVaults && heirVaults.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-300 font-medium mb-2">🤖 Automatic Distribution</p>
                    <p className="text-xs text-gray-400">
                      Athera uses Chainlink Automation to automatically distribute inheritance when the countdown reaches zero. 
                      You don't need to do anything - the funds will be sent to your wallet automatically!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm text-purple-300 font-medium mb-2">💡 Manual Claim (Optional)</p>
                    <p className="text-xs text-gray-400">
                      If automatic distribution hasn't happened yet, you can manually claim your inheritance using the "Claim Inheritance" button.
                      This is just a backup option - the system will distribute automatically.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Activity - Only show if user has vaults and on My Vaults tab */}
          {activeTab === 'my-vaults' && hasVaults && (
            <div className="mt-8 pt-8 border-t border-gray-900">
              <h2 className="text-sm font-medium text-white mb-4">Activity</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ActivityStatus />
                <NotificationPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
