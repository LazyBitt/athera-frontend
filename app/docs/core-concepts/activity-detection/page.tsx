import Link from 'next/link'

export default function ActivityDetectionPage() {
  return (
    <>
      <h1>Activity Detection</h1>
      <p className="lead">
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

      <div className="not-prose bg-blue-900/20 border border-blue-700 rounded-lg p-4 my-6">
        <p className="text-blue-200 text-sm">
          If you regularly deposit to your vault, you don't need to manually check-in.
          Each deposit resets the countdown.
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
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-1 text-xs">Check-In</h4>
          <p className="text-lg font-bold text-blue-400 mb-1">~$0.50</p>
          <p className="text-gray-400 text-xs">Per check-in</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-1 text-xs">Distribution</h4>
          <p className="text-lg font-bold text-blue-400 mb-1">$0</p>
          <p className="text-gray-400 text-xs">Paid by Chainlink</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-1 text-xs">Annual</h4>
          <p className="text-lg font-bold text-blue-400 mb-1">~$1-2</p>
          <p className="text-gray-400 text-xs">2 check-ins/year</p>
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

      <div className="not-prose mt-10 pt-6 border-t border-gray-800 flex justify-between text-sm">
        <Link href="/docs/core-concepts/how-it-works" className="text-gray-400 hover:text-white">
          ← How It Works
        </Link>
        <Link href="/docs/troubleshooting/common-issues" className="text-blue-400 hover:text-blue-300">
          Troubleshooting →
        </Link>
      </div>
    </>
  )
}
