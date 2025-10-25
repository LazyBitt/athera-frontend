'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ExternalLink, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react'
import { AUTOMATION_ADDRESS } from '../lib/contracts'

export function ChainlinkAutomationSetup() {
  const [copied, setCopied] = useState(false)
  
  const copyAddress = () => {
    navigator.clipboard.writeText(AUTOMATION_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <Card className="border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-400" />
          Chainlink Automation Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-sm text-orange-200 mb-2">
            ⚠️ Untuk distribusi otomatis bekerja, Chainlink Automation harus didaftarkan dan didanai.
          </p>
          <p className="text-xs text-gray-400">
            Tanpa ini, vault hanya bisa didistribusikan secara manual setelah countdown habis.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Langkah Setup:</h4>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm text-white mb-1">Buka Chainlink Automation</p>
                <a 
                  href="https://automation.chain.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  automation.chain.link
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm text-white mb-1">Connect wallet & pilih Base Sepolia</p>
                <p className="text-xs text-gray-400">
                  Pastikan network yang sama dengan vault Anda
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-sm text-white mb-2">Register New Upkeep</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Contract Address:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-900 px-2 py-1 rounded text-blue-400 font-mono flex-1">
                        {AUTOMATION_ADDRESS}
                      </code>
                      <button
                        onClick={copyAddress}
                        className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-green-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Trigger: Custom logic</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="text-sm text-white mb-1">Fund dengan LINK tokens</p>
                <p className="text-xs text-gray-400">
                  Minimum 5 LINK untuk testnet. Ini akan digunakan untuk gas fees distribusi otomatis.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm text-white mb-1">Selesai!</p>
                <p className="text-xs text-gray-400">
                  Chainlink akan otomatis cek vault setiap beberapa menit dan distribute ketika countdown habis.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg space-y-2">
          <p className="text-sm text-blue-300 font-medium">
            💡 Alternatif: Manual Distribution
          </p>
          <p className="text-xs text-gray-400">
            Jika tidak setup Chainlink Automation (atau setup gagal), aplikasi tetap berfungsi sempurna! 
            Anda atau beneficiary bisa klik tombol <strong className="text-white">"Distribute Now"</strong> setelah 
            countdown habis untuk trigger distribusi manual.
          </p>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-2 rounded">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Manual distribution tetap decentralized & secure!</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <a
            href="https://automation.chain.link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Setup Automation
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://faucets.chain.link/base-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Get LINK
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
