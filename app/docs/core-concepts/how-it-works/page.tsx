import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <>
      <h1>How It Works</h1>
      <p className="lead text-gray-400">
        Athera uses a countdown timer and automatic distribution to protect your assets.
      </p>

      <h2>Dead Man's Switch</h2>
      <p>
        Athera implements a dead man's switch—a mechanism that triggers when you stop checking in.
        Similar to train safety systems or emergency protocols, it activates automatically when
        regular confirmation stops.
      </p>

      <h2>Core Components</h2>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8 text-sm">
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Inactivity Timer</div>
          <div className="text-gray-400">
            Every vault has a countdown timer that you configure when creating the vault (1 week to 5 years).
          </div>
        </div>

        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Last Check-In</div>
          <div className="text-gray-400">
            The smart contract stores when you last proved you're active (lastPing timestamp).
          </div>
        </div>

        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Beneficiaries</div>
          <div className="text-gray-400">
            Your designated heirs who will receive assets when the countdown reaches zero.
          </div>
        </div>

        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Automation</div>
          <div className="text-gray-400">
            Chainlink Automation monitors 24/7 and executes distribution automatically.
          </div>
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

      <div className="not-prose border border-gray-800 rounded-lg p-4 my-4 bg-blue-500/10 border-blue-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-white">💡 Note:</strong> If you regularly deposit to your vault, you don't need to manually check-in.
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

      <div className="not-prose border border-gray-800 rounded-lg p-5 my-6 bg-slate-900/30">
        <div className="text-base font-semibold mb-3 text-white">The Process</div>
        <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
          <li>Chainlink monitors all vaults</li>
          <li>Checks if countdown = 0</li>
          <li>Executes distribute()</li>
          <li>Heirs receive funds</li>
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
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-sm">
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Create Vault</div>
          <div className="text-2xl font-bold mb-1 text-white">~$0.10-0.20</div>
          <div className="text-gray-400 text-xs">One-time (Base L2)</div>
        </div>
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Check-In</div>
          <div className="text-2xl font-bold mb-1 text-white">~$0.02-0.05</div>
          <div className="text-gray-400 text-xs">Per check-in</div>
        </div>
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Distribution</div>
          <div className="text-2xl font-bold mb-1 text-white">$0</div>
          <div className="text-gray-400 text-xs">Paid by Chainlink</div>
        </div>
      </div>

      <p className="text-gray-400 text-sm">
        Example: 1 year threshold with check-ins every 6 months = ~$0.04-0.10/year on Base L2
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

      <div className="not-prose mt-12 pt-6 border-t border-gray-800 flex justify-between text-sm">
        <Link
          href="/docs/getting-started/quick-start"
          className="text-gray-400 hover:text-white"
        >
          ← Quick Start
        </Link>
        <Link
          href="/docs/core-concepts/activity-detection"
          className="text-gray-400 hover:text-white"
        >
          Activity Detection →
        </Link>
      </div>
    </>
  )
}
