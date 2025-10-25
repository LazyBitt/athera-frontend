import Link from 'next/link'

export default function ActivityDetectionPage() {
  return (
    <>
      <h1>Activity Detection</h1>
      <p className="lead text-gray-400">
        How Athera tracks your activity.
      </p>

      <h2>Proof of Life</h2>
      <p>
        Athera requires you to actively check-in to prove you're still in control. Any vault
        transaction resets your countdown automatically.
      </p>

      <h3>Why Vault-Only?</h3>
      <ul>
        <li><strong>Privacy:</strong> No tracking across other dApps</li>
        <li><strong>Simplicity:</strong> Only vault transactions count</li>
        <li><strong>Reliability:</strong> No false positives</li>
        <li><strong>Security:</strong> Requires owner signature</li>
      </ul>

      <div className="not-prose border border-gray-800 rounded-lg p-4 my-6 bg-blue-500/10 border-blue-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-white">💡 Note:</strong> If you regularly deposit to your vault, you don't need to manually check-in. Each deposit resets the countdown.
        </p>
      </div>

      <h2>What Resets the Timer</h2>

      <h3>Vault Transactions</h3>
      <p>These actions reset your countdown:</p>
      <ul>
        <li>Deposit funds</li>
        <li>Update beneficiaries</li>
        <li>Manual check-in (click "Reset Timer")</li>
        <li>Emergency withdraw</li>
      </ul>

      <h3>Non-Vault Activity</h3>
      <p>These do NOT reset the timer:</p>
      <ul>
        <li>Viewing the dashboard</li>
        <li>Connecting your wallet</li>
        <li>Transactions on other dApps</li>
        <li>Transfers to other addresses</li>
      </ul>

      <h2>Automatic Distribution</h2>
      <p>
        When your countdown reaches zero, Chainlink Automation executes distribution automatically.
      </p>

      <h2>Dashboard Status</h2>
      <p>Color-coded countdown shows your vault status:</p>
      <ul>
        <li><strong className="text-green-400">Active:</strong> &gt; 30 days remaining</li>
        <li><strong className="text-yellow-400">Warning:</strong> 7-30 days remaining</li>
        <li><strong className="text-orange-400">Critical:</strong> 1-7 days remaining</li>
        <li><strong className="text-red-400">Ready:</strong> Distribution will execute</li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Set calendar reminders (check-in every 6 months)</li>
        <li>Use deposits as backup check-ins</li>
        <li>Test check-in button after creating vault</li>
        <li>Inform heirs about vault address</li>
      </ul>

      <h2>Costs</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-sm">
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Check-In</div>
          <div className="text-2xl font-bold mb-1 text-white">~$0.02-0.05</div>
          <div className="text-gray-400 text-xs">Per check-in (Base L2)</div>
        </div>
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Distribution</div>
          <div className="text-2xl font-bold mb-1 text-white">$0</div>
          <div className="text-gray-400 text-xs">Paid by Chainlink</div>
        </div>
        <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
          <div className="text-base font-semibold mb-2 text-white">Annual Cost</div>
          <div className="text-2xl font-bold mb-1 text-white">~$0.04-0.10</div>
          <div className="text-gray-400 text-xs">2 check-ins/year</div>
        </div>
      </div>

      <h2>FAQ</h2>

      <h3>Can I automate check-ins?</h3>
      <p>
        Technically yes, but not recommended. If the bot fails, distribution executes anyway.
      </p>

      <h3>What if I forget to check-in?</h3>
      <p>
        After the threshold passes, Chainlink executes distribution automatically. This cannot be reversed.
      </p>

      <h3>Can heirs see my activity?</h3>
      <p>
        They can see your last check-in timestamp and countdown if they know your vault address.
        They cannot see your other wallet activity.
      </p>

      <div className="not-prose mt-12 pt-6 border-t border-gray-800 flex justify-between text-sm">
        <Link href="/docs/core-concepts/how-it-works" className="text-gray-400 hover:text-white">
          ← How It Works
        </Link>
        <Link href="/docs/troubleshooting/common-issues" className="text-gray-400 hover:text-white">
          Troubleshooting →
        </Link>
      </div>
    </>
  )
}
