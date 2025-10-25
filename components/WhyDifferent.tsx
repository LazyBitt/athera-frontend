'use client'

import { Section } from './Section'

export function WhyDifferent() {
  return (
    <Section className="py-20 bg-gray-950 border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Athera is different
          </h2>
          <p className="text-gray-400">
            Other solutions require trust. Athera runs on code.
          </p>
        </div>

        <div className="space-y-6">
          {/* Comparison table */}
          <div className="border border-gray-800">
            <div className="grid grid-cols-3 border-b border-gray-800 bg-gray-900 p-4">
              <div className="text-sm font-medium text-gray-400"></div>
              <div className="text-sm font-medium text-white text-center">Athera</div>
              <div className="text-sm font-medium text-gray-400 text-center">Others</div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-800 p-4">
              <div className="text-sm text-gray-300">Custody</div>
              <div className="text-sm text-center text-green-400">Non-custodial</div>
              <div className="text-sm text-center text-gray-500">Custodial</div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-800 p-4">
              <div className="text-sm text-gray-300">Setup time</div>
              <div className="text-sm text-center text-green-400">60 seconds</div>
              <div className="text-sm text-center text-gray-500">Days/weeks</div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-800 p-4">
              <div className="text-sm text-gray-300">Legal paperwork</div>
              <div className="text-sm text-center text-green-400">None</div>
              <div className="text-sm text-center text-gray-500">Required</div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-800 p-4">
              <div className="text-sm text-gray-300">Monthly fees</div>
              <div className="text-sm text-center text-green-400">$0</div>
              <div className="text-sm text-center text-gray-500">$10-50</div>
            </div>
            
            <div className="grid grid-cols-3 p-4">
              <div className="text-sm text-gray-300">AI monitoring</div>
              <div className="text-sm text-center text-green-400">Yes</div>
              <div className="text-sm text-center text-gray-500">No</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20">
            <p className="text-white font-medium mb-2">
              Built specifically for Base
            </p>
            <p className="text-sm text-gray-400">
              Athera leverages Base's low fees and fast transactions to make crypto inheritance accessible to everyone. 
              No other solution is optimized for Base like we are.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
