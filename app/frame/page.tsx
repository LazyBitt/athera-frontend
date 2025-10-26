'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import { Shield, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function FramePage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context)
      sdk.actions.ready()
      setIsSDKLoaded(true)
    }
    
    if (sdk && !isSDKLoaded) {
      load()
    }
  }, [isSDKLoaded])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-sm text-blue-400 uppercase tracking-widest font-medium">Built on Base</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
            Athera
          </h1>
          <p className="text-gray-400 text-lg">
            Automated crypto inheritance on Base
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
            <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-xs text-gray-400">Vaults</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">$487K</div>
            <div className="text-xs text-gray-400">TVL</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
            <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">892</div>
            <div className="text-xs text-gray-400">Users</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-white mb-2">🔒 Non-Custodial</h3>
            <p className="text-sm text-gray-400">Your crypto stays in your wallet. We never have custody.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-white mb-2">⚡ Automated</h3>
            <p className="text-sm text-gray-400">Smart contracts handle distribution when you're inactive.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-white mb-2">🔔 Notifications</h3>
            <p className="text-sm text-gray-400">Get Telegram alerts before countdown expires.</p>
          </div>
        </div>

        {/* CTA */}
        <Link 
          href="/dashboard"
          className="block w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 rounded-xl text-center shadow-lg"
        >
          Launch Full App →
        </Link>

        {/* Farcaster Context (for debugging) */}
        {context && (
          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
            <p className="text-xs text-gray-500">
              Connected via Farcaster • User: {context.user?.username || 'Anonymous'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
