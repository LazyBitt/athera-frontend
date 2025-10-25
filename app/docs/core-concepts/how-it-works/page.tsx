import Link from 'next/link'
import { ArrowRight, Shield, Clock, Users, Zap } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <>
      <h1>How It Works</h1>
      <p className="lead">
        Athera uses a countdown timer and automatic distribution to protect your assets.
      </p>

      <h2>Dead Man's Switch</h2>
      <p>
        Athera implements a dead man's switch—a mechanism that triggers when you stop checking in. 
        Similar to train safety systems or emergency protocols, it activates automatically when 
        regular confirmation stops.
      </p>

      <h2>Core Components</h2>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <Clock className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Inactivity Timer</h3>
          <p className="text-gray-400 text-sm">
            Every vault has a countdown timer that you configure when creating the vault (1 week to 5 years).
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <Shield className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Last Check-In</h3>
          <p className="text-gray-400 text-sm">
            The smart contract stores when you last proved you're active (lastPing timestamp).
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <Users className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Beneficiaries</h3>
          <p className="text-gray-400 text-sm">
            Your designated heirs who will receive assets when the countdown reaches zero.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <Zap className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Automation</h3>
          <p className="text-gray-400 text-sm">
            Chainlink Automation monitors 24/7 and executes distribution automatically.
          </p>
        </div>
      </div>

      <h2>Activity Detection</h2>
      <p>
        Any vault transaction resets your timer. Athera only tracks vault activity—not your other 
        wallet transactions.
      </p>

      <h3>What Resets the Timer</h3>
      <p><strong>These vault transactions reset your countdown:</strong></p>
      <ul>
        <li>Deposit funds</li>
        <li>Update beneficiaries</li>
        <li>Manual check-in (click "Reset Timer")</li>
        <li>Emergency withdraw</li>
      </ul>

      <div className="not-prose bg-blue-900/20 border border-blue-700 rounded-lg p-4 my-4">
        <p className="text-blue-200 text-sm">
          If you regularly deposit to your vault, you don't need to manually check-in.
        </p>
      </div>

      <p><strong>These do NOT reset the timer:</strong></p>
      <ul>
        <li>Viewing the dashboard</li>
        <li>Connecting your wallet</li>
        <li>Transactions on other dApps</li>
        <li>Transfers to other addresses</li>
      </ul>

      <h3>Why Vault-Only?</h3>
      <p>
        Athera only monitors vault transactions for privacy and simplicity. No tracking across dApps, 
        no false positives, and regular vault usage keeps you active automatically.
      </p>

      <h2>Automatic Distribution</h2>
      <p>
        When your countdown reaches zero, Chainlink Automation executes distribution automatically. 
        No manual intervention needed.
      </p>

      <div className="not-prose bg-gray-900 rounded-lg p-5 my-6 border border-gray-800">
        <h3 className="text-sm font-semibold text-white mb-3">The Process</h3>
        <ol className="space-y-2 text-gray-300 text-sm">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
            <span>Chainlink monitors all vaults</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
            <span>Checks if countdown = 0</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
            <span>Executes distribute()</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</span>
            <span>Heirs receive funds</span>
          </li>
        </ol>
      </div>

      <h2>Smart Contract Logic</h2>
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">{`// Check if ready for distribution
function isReadyForDistribution() public view returns (bool) {
    if (executed) return false;
    return block.timestamp > lastPing + threshold;
}

// Execute distribution
function distribute() external {
    require(!executed, "Already distributed");
    require(isReadyForDistribution(), "Not ready yet");
    
    // Transfer funds to beneficiaries
    for (uint i = 0; i < beneficiaries.length; i++) {
        uint amount = (balance * percentages[i]) / 10000;
        beneficiaries[i].transfer(amount);
    }
    
    executed = true;
}`}</code>
      </pre>

      <h2>Costs</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Create Vault</h4>
          <p className="text-xl font-bold text-blue-400 mb-1">~$2-3</p>
          <p className="text-gray-400 text-xs">One-time</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Check-In</h4>
          <p className="text-xl font-bold text-blue-400 mb-1">~$0.50</p>
          <p className="text-gray-400 text-xs">Per check-in</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Distribution</h4>
          <p className="text-xl font-bold text-blue-400 mb-1">$0</p>
          <p className="text-gray-400 text-xs">Paid by Chainlink</p>
        </div>
      </div>

      <p className="text-gray-400 text-sm">
        Example: 1 year threshold with check-ins every 6 months = ~$1-2/year
      </p>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Set realistic threshold:</strong> 1 year recommended</li>
        <li><strong>Set calendar reminders:</strong> Check-in every 6 months</li>
        <li><strong>Inform your heirs:</strong> Share vault address and threshold</li>
        <li><strong>Test first:</strong> Start with 0.001 ETH</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/docs/core-concepts/activity-detection">Learn more about Activity Detection</Link></li>
        <li><Link href="/docs/core-concepts/balances">Understand Wallet vs Vault Balance</Link></li>
        <li><Link href="/docs/core-concepts/chainlink-automation">Deep dive into Chainlink Automation</Link></li>
        <li><Link href="/docs/core-concepts/security">Read Security Features</Link></li>
      </ul>

      <div className="not-prose mt-12 pt-8 border-t border-gray-800">
        <div className="flex justify-between">
          <Link
            href="/docs/getting-started/quick-start"
            className="text-gray-400 hover:text-white flex items-center"
          >
            ← Quick Start
          </Link>
          <Link
            href="/docs/core-concepts/activity-detection"
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            Activity Detection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
