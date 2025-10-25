import Link from 'next/link'

export default function QuickStartPage() {
  return (
    <>
      <h1>Quick Start</h1>
      <p className="lead text-gray-400">
        Create your first vault in 5 minutes.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>MetaMask or compatible wallet</li>
        <li>ETH on Base Sepolia (testnet) or Base (mainnet)</li>
      </ul>

      <h2>Get Testnet ETH</h2>
      <p>Visit the <a href="https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet" target="_blank" rel="noopener noreferrer">Base Sepolia Faucet</a> and request free testnet ETH.</p>

      <h2>Connect Your Wallet</h2>
      <ol>
        <li>Go to the <Link href="/dashboard">Dashboard</Link></li>
        <li>Click "Connect Wallet"</li>
        <li>Approve the connection</li>
        <li>Switch to Base Sepolia if prompted</li>
      </ol>

      <h2>Create a Vault</h2>
      <ol>
        <li>Click "Create Vault"</li>
        <li>Set inactivity threshold (1 year recommended)</li>
        <li>Add beneficiary address and allocation percentage</li>
        <li>Confirm the transaction</li>
      </ol>

      <p className="text-sm text-gray-500">Gas cost: approximately $2-3</p>

      <h2>Deposit Funds</h2>
      <ol>
        <li>Open your vault from the dashboard</li>
        <li>Click "Deposit"</li>
        <li>Enter amount (try 0.001 ETH first)</li>
        <li>Confirm transaction</li>
      </ol>

      <h2>Test Check-In</h2>
      <p>Click "Reset Timer" and confirm. The countdown resets to your threshold duration.</p>

      <div className="not-prose border border-gray-800 rounded-md p-4 my-6">
        <p className="text-sm text-gray-400">
          <strong className="text-gray-300">Note:</strong> Set a calendar reminder to check-in every 6 months if using a 1-year threshold.
        </p>
      </div>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/docs/core-concepts/how-it-works">How It Works</Link></li>
        <li><Link href="/docs/core-concepts/activity-detection">Activity Detection</Link></li>
        <li><Link href="/docs/troubleshooting/common-issues">Troubleshooting</Link></li>
      </ul>

      <div className="not-prose mt-12 pt-6 border-t border-gray-800 flex justify-between text-sm">
        <Link href="/docs" className="text-gray-400 hover:text-white">
          ← Documentation
        </Link>
        <Link href="/docs/core-concepts/how-it-works" className="text-gray-400 hover:text-white">
          How It Works →
        </Link>
      </div>
    </>
  )
}
