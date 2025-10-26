'use client'

import { Section } from './Section'

export function Benefits() {
  return (
    <Section className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          Why Athera?
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Non-custodial</h3>
            <p className="text-gray-400 leading-relaxed text-justify">
              Your crypto never leaves your wallet. We can't touch it, freeze it, or lose it. You have complete control until the smart contract executes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Transparent</h3>
            <p className="text-gray-400 leading-relaxed text-justify">
              Everything happens on-chain. You can verify the smart contract code. No hidden fees, no surprises.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Flexible</h3>
            <p className="text-gray-400 leading-relaxed text-justify">
              Change your beneficiaries anytime. Adjust the inactivity period. Withdraw your funds. You're always in control.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Simple</h3>
            <p className="text-gray-400 leading-relaxed text-justify">
              Setup takes 60 seconds. No legal paperwork. No complicated processes. Just connect your wallet and you're done.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
