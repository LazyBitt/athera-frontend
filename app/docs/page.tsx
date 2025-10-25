import Link from 'next/link'

export default function DocsPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">
          Documentation
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Decentralized crypto inheritance that works automatically.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">What is Athera?</h2>
        <p className="text-gray-300 leading-relaxed mb-4 text-justify">
          Athera is a decentralized inheritance protocol built on Base blockchain that automatically distributes your crypto assets to designated beneficiaries when you become inactive. Create a vault, deposit your assets, set a countdown period (e.g., 1 year), and check-in periodically to prove you're still active. If you stop checking in for the specified period, your assets are automatically distributed to your beneficiaries according to the percentages you've set—powered by Chainlink Automation for trustless execution.
        </p>
        <p className="text-gray-400 leading-relaxed text-justify">
          Unlike traditional inheritance systems that require lawyers and lengthy legal processes, Athera uses smart contracts to automate everything. It's completely non-custodial (you maintain full control), transparent (all transactions verifiable on BaseScan), and supports additional features like IPFS document storage and Telegram notifications. Think of it as a dead man's switch for crypto—simple, automated, and trustless.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
            <div className="text-lg font-semibold mb-2 text-white">Non-Custodial</div>
            <div className="text-gray-400">
              Full control of your assets
            </div>
          </div>
          <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
            <div className="text-lg font-semibold mb-2 text-white">Automated</div>
            <div className="text-gray-400">
              Chainlink handles distribution
            </div>
          </div>
          <div className="border border-gray-800 rounded-lg p-5 bg-slate-900/30">
            <div className="text-lg font-semibold mb-2 text-white">Trustless</div>
            <div className="text-gray-400">
              Smart contracts, no intermediaries
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Get Started</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <Link
            href="/docs/getting-started/quick-start"
            className="block border border-gray-800 rounded-md p-4 hover:border-gray-700 transition-colors"
          >
            <div className="font-medium mb-1">
              Quick Start →
            </div>
            <div className="text-gray-400">
              Create your first vault in 5 minutes
            </div>
          </Link>

          <Link
            href="/docs/core-concepts/how-it-works"
            className="block border border-gray-800 rounded-md p-4 hover:border-gray-700 transition-colors"
          >
            <div className="font-medium mb-1">
              How It Works →
            </div>
            <div className="text-gray-400">
              Understand the mechanism
            </div>
          </Link>

          <Link
            href="/docs/core-concepts/activity-detection"
            className="block border border-gray-800 rounded-md p-4 hover:border-gray-700 transition-colors"
          >
            <div className="font-medium mb-1">
              Activity Detection →
            </div>
            <div className="text-gray-400">
              How check-ins work
            </div>
          </Link>

          <Link
            href="/docs/troubleshooting/common-issues"
            className="block border border-gray-800 rounded-md p-4 hover:border-gray-700 transition-colors"
          >
            <div className="font-medium mb-1">
              Troubleshooting →
            </div>
            <div className="text-gray-400">
              Common issues and fixes
            </div>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Community</h2>
        <div className="border border-gray-800 rounded-md p-4">
          <p className="text-gray-400 mb-3 text-sm leading-relaxed">
            Questions? Join us on GitHub or Discord.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/yourusername/athera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white underline underline-offset-4"
            >
              GitHub
            </a>
            <a href="#" className="text-gray-300 hover:text-white underline underline-offset-4">
              Discord
            </a>
            <a href="#" className="text-gray-300 hover:text-white underline underline-offset-4">
              Twitter
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
