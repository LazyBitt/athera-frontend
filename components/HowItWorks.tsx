'use client'

import { Section } from './Section'

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="relative">
            <div className="text-blue-500 font-mono text-sm mb-3 opacity-60">01</div>
            <h3 className="text-xl font-semibold text-white mb-3">Create a vault</h3>
            <p className="text-gray-400 leading-relaxed">
              Connect your wallet and set up a vault. Add your beneficiaries and decide how to split your assets.
            </p>
          </div>

          <div className="relative">
            <div className="text-blue-500 font-mono text-sm mb-3 opacity-60">02</div>
            <h3 className="text-xl font-semibold text-white mb-3">Set your inactivity period</h3>
            <p className="text-gray-400 leading-relaxed">
              Choose how long you can be inactive before distribution happens. 6 months? 1 year? You decide.
            </p>
          </div>

          <div className="relative">
            <div className="text-blue-500 font-mono text-sm mb-3 opacity-60">03</div>
            <h3 className="text-xl font-semibold text-white mb-3">Stay active or let it distribute</h3>
            <p className="text-gray-400 leading-relaxed">
              Ping your vault occasionally to stay active. If you don't, the smart contract automatically sends your crypto to your beneficiaries.
            </p>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl">
          <p className="text-gray-300 text-lg">
            Your crypto stays in your wallet the whole time. We never have custody. You can withdraw or update beneficiaries anytime.
          </p>
        </div>
      </div>
    </Section>
  )
}
