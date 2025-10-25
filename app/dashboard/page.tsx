'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Navbar } from '../../components/Navbar'
import { VaultTab } from '../../components/dashboard/VaultTab'
import { InheritanceTab } from '../../components/dashboard/InheritanceTab'
import { MessagesTab } from '../../components/dashboard/MessagesTab'
import { NotificationsTab } from '../../components/dashboard/NotificationsTab'
import { VaultStats } from '../../components/VaultStats'
import { QuickActions } from '../../components/QuickActions'
import { RecentActivity } from '../../components/RecentActivity'
import { AutomationMonitor } from '../../components/AutomationMonitor'
import { useDashboardStore } from '../../store/dashboard'
import { Wallet, Gift, MessageSquare, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { isConnected, address } = useAccount()
  const { activeTab, setActiveTab, notifications } = useDashboardStore()
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-8 text-gray-400">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Wallet className="h-20 w-20 text-blue-500 mx-auto mb-4" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white">
                Connect Your Wallet
              </h1>
              <p className="text-xl mb-8 text-gray-400">
                Access your inheritance vaults and manage your digital legacy
              </p>
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-2xl"
                  >
                    Connect Wallet
                  </button>
                )}
              </ConnectButton.Custom>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  const tabs = [
    { id: 'vault' as const, label: 'Vault', icon: Wallet, badge: 0 },
    { id: 'inheritance' as const, label: 'Inheritance', icon: Gift, badge: 0 },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare, badge: 0 },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell, badge: unreadCount },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-sm text-gray-400">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            
            {/* Stats Overview */}
            <VaultStats />
          </div>
          
          {/* Automation Monitor */}
          <div className="mb-6">
            <AutomationMonitor />
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex gap-2 p-1.5 bg-gray-900/50 rounded-2xl border border-gray-800 w-fit">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className={`
                        ml-1 px-1.5 py-0.5 text-xs rounded-full
                        ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'}
                      `}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'vault' && <VaultTab />}
              {activeTab === 'inheritance' && <InheritanceTab />}
              {activeTab === 'messages' && <MessagesTab />}
              {activeTab === 'notifications' && <NotificationsTab />}
            </motion.div>
          </AnimatePresence>
          
          {/* Recent Activity Sidebar */}
          {activeTab === 'vault' && (
            <div className="mt-8">
              <RecentActivity />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
