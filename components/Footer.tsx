'use client'

import Link from 'next/link'
import { Github, X, Mail, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react'

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
                The most secure and user-friendly platform for crypto inheritance. 
                Protect your digital assets with automated distribution to your beneficiaries.
              </p>
              
              {/* Newsletter Signup */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Get the latest updates on security features and platform improvements.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300">
                  <X className="h-5 w-5" />
                </a>
                <a href="mailto:contact@athera.com" className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300">
                  <Mail className="h-5 w-5" />
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
            
            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Security Audit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Bug Bounty
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <p>&copy; 2024 Athera. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-green-500" />
                <span>Audited</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3 text-blue-500" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
