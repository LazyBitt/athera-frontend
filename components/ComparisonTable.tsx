'use client'

import { Check, X } from 'lucide-react'

export function ComparisonTable() {
  const features = [
    { name: 'Setup Time', athera: '60 seconds', others: 'Days/Weeks' },
    { name: 'Custody', athera: 'Non-custodial', others: 'Custodial' },
    { name: 'Legal Paperwork', athera: 'None', others: 'Required' },
    { name: 'Monthly Fees', athera: '$0', others: '$10-50' },
    { name: 'Telegram Alerts', athera: true, others: false },
    { name: 'Multi-beneficiary', athera: true, others: true },
    { name: 'Automated Distribution', athera: true, others: false },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Choose Athera?
        </h2>
        <p className="text-gray-400">
          Compare with traditional inheritance solutions
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-900 border-b border-gray-800">
          <div className="p-4 text-gray-400 text-sm font-medium"></div>
          <div className="p-4 text-center">
            <div className="text-cyan-400 font-bold text-lg">Athera</div>
            <div className="text-xs text-gray-500 mt-1">On Base</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-gray-400 font-bold text-lg">Others</div>
            <div className="text-xs text-gray-500 mt-1">Traditional</div>
          </div>
        </div>

        {features.map((feature, index) => (
          <div 
            key={index}
            className={`grid grid-cols-3 border-b border-gray-800 last:border-0 ${
              index % 2 === 0 ? 'bg-gray-900/30' : ''
            }`}
          >
            <div className="p-4 text-gray-300 font-medium text-sm">
              {feature.name}
            </div>
            <div className="p-4 text-center">
              {typeof feature.athera === 'boolean' ? (
                feature.athera ? (
                  <Check className="w-5 h-5 text-green-400 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-red-400 mx-auto" />
                )
              ) : (
                <span className="text-cyan-400 font-semibold">{feature.athera}</span>
              )}
            </div>
            <div className="p-4 text-center">
              {typeof feature.others === 'boolean' ? (
                feature.others ? (
                  <Check className="w-5 h-5 text-green-400 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-gray-600 mx-auto" />
                )
              ) : (
                <span className="text-gray-500">{feature.others}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/dashboard"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 rounded-full shadow-lg shadow-blue-500/50"
        >
          Get Started with Athera →
        </a>
      </div>
    </div>
  )
}
