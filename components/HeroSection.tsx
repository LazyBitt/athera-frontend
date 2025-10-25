'use client'

import { Section } from './Section'
import Link from 'next/link'

export function HeroSection() {
  return (
    <Section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="text-sm text-gray-500 border border-gray-800 px-3 py-1">
              Built on Base
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Your legacy stays alive —<br />even when you're gone
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Athera keeps your crypto safe and transfers it to your loved ones, automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-full"
            >
              Get Started
            </Link>
            
            <button 
              className="px-6 py-3 border border-gray-800 text-gray-300 hover:bg-gray-900 transition-colors rounded-full"
              onClick={() => {
                const element = document.getElementById('how-it-works')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              How it works
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <span>Non-custodial</span>
            <span>•</span>
            <span>Open source</span>
            <span>•</span>
            <span>Audited</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
