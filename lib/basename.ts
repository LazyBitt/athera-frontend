import { base, baseSepolia } from 'viem/chains'

const BASENAME_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD' // Base mainnet
const BASENAME_RESOLVER_ADDRESS_TESTNET = '0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA' // Base Sepolia

export async function getBasename(address: string, isTestnet = true): Promise<string | null> {
  try {
    const response = await fetch(
      `https://resolver-api.basename.app/v1/name/${address}?chain=${isTestnet ? 'base-sepolia' : 'base'}`
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    return data.name || null
  } catch (error) {
    console.error('Error fetching basename:', error)
    return null
  }
}

export function formatAddress(address: string, basename?: string | null): string {
  if (basename) return basename
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
