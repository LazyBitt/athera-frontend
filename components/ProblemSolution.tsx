'use client'

import { Section } from './Section'
import { useState } from 'react'

export function ProblemSolution() {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem')

  return (
    <Section className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 mb-12 bg-gray-900 p-1.5 rounded-full w-fit mx-auto">
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-6 py-2.5 font-medium transition-all rounded-full ${
              activeTab === 'problem'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            The Problem
          </button>
          <button
            onClick={() => setActiveTab('solution')}
            className={`px-6 py-2.5 font-medium transition-all rounded-full ${
              activeTab === 'solution'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Our Solution
          </button>
        </div>

        {activeTab === 'problem' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-sm mb-4">
                $140B+ lost forever
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Crypto inheritance is broken
              </h3>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                When someone dies or loses access to their wallet, their crypto is gone. No bank can help. No lawyer can recover it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Private keys die with you</h4>
                <p className="text-gray-400 text-sm">
                  Your family knows you have crypto, but they can't access it. The keys are on your laptop, in your head, or written on paper somewhere.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Traditional wills don't work</h4>
                <p className="text-gray-400 text-sm">
                  You can't just write "give my Bitcoin to my kids" in a will. Without the private keys, it's worthless.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Custodial solutions require trust</h4>
                <p className="text-gray-400 text-sm">
                  Giving your keys to a third party defeats the whole point of crypto. Not your keys, not your coins.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">No good alternatives exist</h4>
                <p className="text-gray-400 text-sm">
                  Current solutions are either too complex, require custody, or don't actually work when you need them.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solution' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm mb-4">
                Smart contract automation
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Athera solves this with code
              </h3>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Smart contracts automatically distribute your crypto when you're inactive. No middlemen. No custody. Just code.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Automatic distribution</h4>
                <p className="text-gray-400 text-sm">
                  Set an inactivity period (e.g., 6 months). If you don't ping your vault in that time, it automatically sends your crypto to your beneficiaries.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">You keep full control</h4>
                <p className="text-gray-400 text-sm">
                  Your crypto stays in your wallet. You can withdraw, update beneficiaries, or cancel anytime. We never have custody.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Multiple beneficiaries</h4>
                <p className="text-gray-400 text-sm">
                  Split your assets however you want. 50% to your spouse, 25% to each kid. The smart contract handles the distribution.
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-3xl hover:border-blue-500 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">Notifications keep everyone informed</h4>
                <p className="text-gray-400 text-sm">
                  Get Telegram alerts when you're approaching inactivity. Your beneficiaries get notified before distribution happens.
                </p>
              </div>
            </div>


          </div>
        )}
      </div>
    </Section>
  )
}
