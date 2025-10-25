'use client'

import { Section } from './Section'
import { useState } from 'react'

export function DemoVideo() {
  return (
    <Section className="py-20 bg-black border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-gray-400">
            Watch how Athera protects your crypto in under 60 seconds
          </p>
        </div>

        {/* Video placeholder */}
        <div className="relative aspect-video bg-gray-900 border border-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Demo video coming soon</p>
          </div>
        </div>

        {/* Quick stats below video */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">60s</p>
            <p className="text-sm text-gray-500">Setup time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">$0</p>
            <p className="text-sm text-gray-500">Monthly fees</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-gray-500">Non-custodial</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
