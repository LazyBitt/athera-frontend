// import { ethers } from 'ethers';
// Temporarily disabled - needs migration to viem

// AtheraAutomation ABI (minimal for frontend)
export const AUTOMATION_ABI = [
  'function getReadyVaults() external view returns (address[] memory)',
  'function getAllVaultsStatus() external view returns (address[] memory vaults, bool[] memory statuses, uint256[] memory timeRemaining)',
  'function manualExecute(address payable vaultAddress) external',
  'function batchManualExecute(address payable[] calldata vaultAddresses) external',
  'event VaultDistributed(address indexed vault, uint256 timestamp)',
  'event DistributionFailed(address indexed vault, string reason)',
  'event UpkeepPerformed(uint256 vaultsChecked, uint256 vaultsExecuted)',
];

// Automation contract addresses by network
export const AUTOMATION_ADDRESSES: Record<number, string> = {
  1: '', // Ethereum Mainnet - Deploy and add address
  11155111: '', // Sepolia Testnet - Deploy and add address
  137: '', // Polygon - Deploy and add address
  80001: '', // Mumbai Testnet - Deploy and add address
};

export interface VaultStatus {
  address: string;
  isReady: boolean;
  timeRemaining: number;
}

export interface AutomationStats {
  totalVaults: number;
  readyVaults: number;
  activeVaults: number;
  executedVaults: number;
}

/**
 * Get Automation contract instance
 */
export function getAutomationContract(
  provider: any,
  chainId: number
): any | null {
  const address = AUTOMATION_ADDRESSES[chainId];
  if (!address) return null;
  
  // return new ethers.Contract(address, AUTOMATION_ABI, provider);
  return null; // Temporarily disabled
}

/**
 * Get vaults ready for distribution
 */
export async function getReadyVaults(
  provider: any,
  chainId: number
): Promise<string[]> {
  // Temporarily disabled
  return [];
}

/**
 * Get status of all vaults
 */
export async function getAllVaultsStatus(
  provider: any,
  chainId: number
): Promise<VaultStatus[]> {
  // Temporarily disabled
  return [];
}

/**
 * Manually execute distribution for a vault
 */
export async function manualExecuteVault(
  signer: any,
  chainId: number,
  vaultAddress: string
): Promise<any> {
  throw new Error('Automation contract not found - temporarily disabled');
}

/**
 * Batch execute multiple vaults
 */
export async function batchExecuteVaults(
  signer: any,
  chainId: number,
  vaultAddresses: string[]
): Promise<any> {
  throw new Error('Automation contract not found - temporarily disabled');
}

/**
 * Listen to automation events
 */
export function listenToAutomationEvents(
  provider: any,
  chainId: number,
  callbacks: {
    onVaultDistributed?: (vault: string, timestamp: number) => void;
    onDistributionFailed?: (vault: string, reason: string) => void;
    onUpkeepPerformed?: (vaultsChecked: number, vaultsExecuted: number) => void;
  }
) {
  // Temporarily disabled
  return () => {};
}

/**
 * Get automation statistics
 */
export async function getAutomationStats(
  provider: any,
  chainId: number
): Promise<AutomationStats> {
  // Temporarily disabled - return mock data
  return {
    totalVaults: 0,
    readyVaults: 0,
    activeVaults: 0,
    executedVaults: 0,
  };
}

/**
 * Check if automation is enabled for network
 */
export function isAutomationEnabled(chainId: number): boolean {
  return !!AUTOMATION_ADDRESSES[chainId];
}

/**
 * Get Chainlink Automation UI URL for network
 */
export function getAutomationUIUrl(chainId: number): string {
  const urls: Record<number, string> = {
    1: 'https://automation.chain.link',
    11155111: 'https://automation.chain.link/sepolia',
    137: 'https://automation.chain.link/polygon',
    80001: 'https://automation.chain.link/mumbai',
  };
  
  return urls[chainId] || 'https://automation.chain.link';
}
