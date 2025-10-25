'use client'

import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '../lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          // Don't retry on WalletConnect connection errors
          if (error?.message?.includes('Connection interrupted')) {
            return false
          }
          return failureCount < 3
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  }))

  useEffect(() => {
    // Handle WalletConnect connection errors
    const handleError = (error: any) => {
      if (error?.message?.includes('Connection interrupted')) {
        console.warn('WalletConnect connection interrupted. This is usually temporary.')
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
