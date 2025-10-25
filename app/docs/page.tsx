import Link from 'next/link'
import { Shield, Zap, Lock } from 'lucide-react'

export default function DocsPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Documentation
        </h1>
        <p className="text-xl text-gray-400">
          Decentralized crypto inheritance that works automatically.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">What is Athera?</h2>
        <p className="text-gray-300 mb-4">
          Athera automatically distributes your crypto to beneficiaries when you become inactive. 
          Create a vault, set a threshold, and check-in periodically. If you stop checking in, 
          your assets transfer automatically.
        </p>
        <p className="text-gray-400">
          It's a dead man's switch for crypto—simple, automated, and non-custodial.
        </p>
      </section>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <Shield className="h-6 w-6 text-blue-500 mb-3" />
          <h3 className="text-sm font-semibold text-white mb-1">Non-Custodial</h3>
          <p className="text-gray-400 text-sm">
            Full control of your assets
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <Zap className="h-6 w-6 text-blue-500 mb-3" />
          <h3 className="text-sm font-semibold text-white mb-1">Automated</h3>
          <p className="text-gray-400 text-sm">
            Chainlink handles distribution
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <Lock className="h-6 w-6 text-blue-500 mb-3" />
          <h3 className="text-sm font-semibold text-white mb-1">Trustless</h3>
          <p className="text-gray-400 text-sm">
            Smart contracts, no intermediaries
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/docs/getting-started/quick-start"
            className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors group"
          >
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400">
              Quick Start →
            </h3>
            <p className="text-gray-400 text-sm">
              Create your first vault in 5 minutes
            </p>
          </Link>

          <Link
            href="/docs/core-concepts/how-it-works"
            className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors group"
          >
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400">
              How It Works →
            </h3>
            <p className="text-gray-400 text-sm">
              Understand the mechanism
            </p>
          </Link>

          <Link
            href="/docs/core-concepts/activity-detection"
            className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors group"
          >
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400">
              Activity Detection →
            </h3>
            <p className="text-gray-400 text-sm">
              How check-ins work
            </p>
          </Link>

          <Link
            href="/docs/troubleshooting/common-issues"
            className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors group"
          >
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400">
              Troubleshooting →
            </h3>
            <p className="text-gray-400 text-sm">
              Common issues and fixes
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Community</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-gray-300 mb-3 text-sm">
            Questions? Join us on GitHub or Discord.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/yourusername/athera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              GitHub →
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Discord →
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Twitter →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
