'use client'

import Link from 'next/link'
import { Github, X, ShieldCheck, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Athera
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Automated crypto inheritance on Base. Set it up once, your family is protected forever.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300">
                  <X className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    How It Works
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/#security" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    Security
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    Documentation
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    Dashboard
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    Base Network
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://docs.chain.link/chainlink-automation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    Chainlink Automation
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <Link href="/#faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; 2025 Athera
            </p>

            {/* Status Badge */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live on Base Sepolia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
