'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Athera
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-gray-400 hover:text-white">
              Docs
            </Link>
            <button 
              onClick={() => {
                const element = document.getElementById('faq')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white"
            >
              FAQ
            </button>
            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
          </div>

          <div className="hidden md:block">
            <ConnectButton />
          </div>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-white text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <button 
                onClick={() => {
                  const element = document.getElementById('faq')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
                className="text-gray-400 hover:text-white text-left"
              >
                FAQ
              </button>
              <Link 
                href="/dashboard" 
                className="text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
