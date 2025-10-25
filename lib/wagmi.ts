import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from './viem'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) {
  console.warn('⚠️ NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set. WalletConnect may not work properly.')
  console.warn('Please get a project ID from https://cloud.walletconnect.com/ and add it to your .env.local file')
}

export const config = getDefaultConfig({
  appName: 'Athera',
  projectId: projectId || 'demo-project-id',
  chains: [base, baseSepolia],
  ssr: false,
})
