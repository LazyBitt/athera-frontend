import Link from 'next/link'

export default function CommonIssuesPage() {
  return (
    <>
      <h1>Troubleshooting</h1>
      <p className="lead">
        Common issues and how to fix them.
      </p>

      <h2>Transaction Failed</h2>

      <h3>User Rejected</h3>
      <p>You clicked "Reject" in MetaMask.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Try again and click "Confirm"</p>

      <h3>Insufficient Gas</h3>
      <p>Not enough ETH for gas fees.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Ensure you have at least 0.01 ETH. Get testnet ETH from the <a href="https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet" target="_blank" rel="noopener noreferrer">Base Sepolia Faucet</a>.</p>

      <h3>Wrong Network</h3>
      <p>MetaMask is on the wrong network.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Switch to Base Sepolia (testnet) or Base (mainnet) in MetaMask.</p>

      <h3>Invalid Address</h3>
      <p>Beneficiary address format is incorrect.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Verify address starts with 0x and is 42 characters. Copy-paste to avoid typos.</p>

      <h2>Vaults Not Loading</h2>

      <h3>Check Network</h3>
      <p>Ensure MetaMask shows "Base Sepolia" or "Base". Switch if needed, then refresh.</p>

      <h3>Verify Environment Variables</h3>
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-4">
        <code className="text-sm text-gray-300">{`# Check frontend/.env.local
NEXT_PUBLIC_FACTORY_ADDRESS=0x...

# If missing:
1. Add correct address
2. Restart dev server`}</code>
      </pre>

      <h3>Hard Refresh</h3>
      <p>Windows: Ctrl + Shift + R | Mac: Cmd + Shift + R</p>

      <h3>Check Console</h3>
      <p>Open browser console (F12) and look for errors.</p>

      <h2>Percentages Don't Add Up</h2>
      <p>Total allocation must equal exactly 100%.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Check each percentage. Example: 60% + 40% = 100% ✓</p>

      <h2>Vault Not Showing</h2>
      <p>Can't see your vault after creation.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Wait for transaction confirmation (~2-5 seconds), then refresh. Ensure you're using the same wallet and network.</p>

      <h2>MetaMask Not Opening</h2>
      <p>MetaMask popup doesn't appear.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Check if MetaMask is installed and unlocked. Disable popup blockers. Try again.</p>

      <h2>Timer Not Updating</h2>
      <p>Countdown stuck or not moving.</p>
      <p className="text-sm text-gray-400"><strong>Fix:</strong> Refresh the page. Check internet connection.</p>

      <h2>Still Stuck?</h2>
      <p>Before asking for help:</p>
      <ul>
        <li>Wallet connected (see address in top right)</li>
        <li>Correct network (Base Sepolia or Base)</li>
        <li>Have ETH for gas (&gt;0.01 ETH)</li>
        <li>Check browser console for errors (F12)</li>
      </ul>

      <p className="text-sm text-gray-400 mt-6">Join our Discord or open a GitHub issue for support.</p>

      <div className="not-prose mt-12 pt-8 border-t border-gray-800">
        <div className="flex justify-between text-sm">
          <Link
            href="/docs/core-concepts/activity-detection"
            className="text-gray-400 hover:text-white"
          >
            ← Activity Detection
          </Link>
          <Link
            href="/docs"
            className="text-blue-400 hover:text-blue-300"
          >
            Docs Home →
          </Link>
        </div>
      </div>
    </>
  )
}
