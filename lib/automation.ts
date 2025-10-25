import { ethers } from 'ethers';

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
  provider: ethers.providers.Provider | ethers.Signer,
  chainId: number
): ethers.Contract | null {
  const address = AUTOMATION_ADDRESSES[chainId];
  if (!address) return null;
  
  return new ethers.Contract(address, AUTOMATION_ABI, provider);
}

/**
 * Get vaults ready for distribution
 */
export async function getReadyVaults(
  provider: ethers.providers.Provider,
  chainId: number
): Promise<string[]> {
  const contract = getAutomationContract(provider, chainId);
  if (!contract) return [];
  
  try {
    const readyVaults = await contract.getReadyVaults();
    return readyVaults;
  } catch (error) {
    console.error('Error getting ready vaults:', error);
    return [];
  }
}

/**
 * Get status of all vaults
 */
export async function getAllVaultsStatus(
  provider: ethers.providers.Provider,
  chainId: number
): Promise<VaultStatus[]> {
  const contract = getAutomationContract(provider, chainId);
  if (!contract) return [];
  
  try {
    const [vaults, statuses, timeRemaining] = await contract.getAllVaultsStatus();
    
    return vaults.map((address: string, index: number) => ({
      address,
      isReady: statuses[index],
      timeRemaining: timeRemaining[index].toNumber(),
    }));
  } catch (error) {
    console.error('Error getting vaults status:', error);
    return [];
  }
}

/**
 * Manually execute distribution for a vault
 */
export async function manualExecuteVault(
  signer: ethers.Signer,
  chainId: number,
  vaultAddress: string
): Promise<ethers.ContractTransaction> {
  const contract = getAutomationContract(signer, chainId);
  if (!contract) throw new Error('Automation contract not found');
  
  return await contract.manualExecute(vaultAddress);
}

/**
 * Batch execute multiple vaults
 */
export async function batchExecuteVaults(
  signer: ethers.Signer,
  chainId: number,
  vaultAddresses: string[]
): Promise<ethers.ContractTransaction> {
  const contract = getAutomationContract(signer, chainId);
  if (!contract) throw new Error('Automation contract not found');
  
  return await contract.batchManualExecute(vaultAddresses);
}

/**
 * Listen to automation events
 */
export function listenToAutomationEvents(
  provider: ethers.providers.Provider,
  chainId: number,
  callbacks: {
    onVaultDistributed?: (vault: string, timestamp: number) => void;
    onDistributionFailed?: (vault: string, reason: string) => void;
    onUpkeepPerformed?: (vaultsChecked: number, vaultsExecuted: number) => void;
  }
) {
  const contract = getAutomationContract(provider, chainId);
  if (!contract) return () => {};
  
  // Listen to VaultDistributed events
  if (callbacks.onVaultDistributed) {
    contract.on('VaultDistributed', (vault, timestamp) => {
      callbacks.onVaultDistributed!(vault, timestamp.toNumber());
    });
  }
  
  // Listen to DistributionFailed events
  if (callbacks.onDistributionFailed) {
    contract.on('DistributionFailed', (vault, reason) => {
      callbacks.onDistributionFailed!(vault, reason);
    });
  }
  
  // Listen to UpkeepPerformed events
  if (callbacks.onUpkeepPerformed) {
    contract.on('UpkeepPerformed', (vaultsChecked, vaultsExecuted) => {
      callbacks.onUpkeepPerformed!(
        vaultsChecked.toNumber(),
        vaultsExecuted.toNumber()
      );
    });
  }
  
  // Return cleanup function
  return () => {
    contract.removeAllListeners();
  };
}

/**
 * Get automation statistics
 */
export async function getAutomationStats(
  provider: ethers.providers.Provider,
  chainId: number
): Promise<AutomationStats> {
  const statuses = await getAllVaultsStatus(provider, chainId);
  
  return {
    totalVaults: statuses.length,
    readyVaults: statuses.filter(s => s.isReady).length,
    activeVaults: statuses.filter(s => !s.isReady && s.timeRemaining > 0).length,
    executedVaults: statuses.filter(s => !s.isReady && s.timeRemaining === 0).length,
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
