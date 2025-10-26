'use client'

import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getConfig } from '../lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base, baseSepolia } from 'viem/chains'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  const queryClient = useMemo(() => new QueryClient({
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
  }), [])
  
  const config = useMemo(() => getConfig(), [])

  useEffect(() => {
    setMounted(true)
    
    // Handle WalletConnect connection errors
    const handleError = (error: any) => {
      if (error?.message?.includes('Connection interrupted')) {
        console.warn('WalletConnect connection interrupted. This is usually temporary.')
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
  
  if (!mounted) {
    return null
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia} // or base for mainnet
        >
          <RainbowKitProvider
            modalSize="compact"
            showRecentTransactions={true}
          >
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
