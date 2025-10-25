import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from './viem'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId && typeof window !== 'undefined') {
  console.warn('⚠️ NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set. WalletConnect may not work properly.')
  console.warn('Please get a project ID from https://cloud.walletconnect.com/ and add it to your .env.local file')
}

// Create config only once
let wagmiConfig: ReturnType<typeof getDefaultConfig> | null = null

export const getConfig = () => {
  if (!wagmiConfig) {
    wagmiConfig = getDefaultConfig({
      appName: 'Athera',
      projectId: projectId || 'demo-project-id',
      chains: [base, baseSepolia],
      ssr: false,
    })
  }
  return wagmiConfig
}

export const config = getConfig()
