'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Menu, X, Search } from 'lucide-react'

const navigation = {
  'GETTING STARTED': [
    { title: 'Introduction', href: '/docs' },
    { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
  ],
  'CORE CONCEPTS': [
    { title: 'How It Works', href: '/docs/core-concepts/how-it-works' },
    { title: 'Activity Detection', href: '/docs/core-concepts/activity-detection' },
  ],
  'TROUBLESHOOTING': [
    { title: 'Common Issues', href: '/docs/troubleshooting/common-issues' },
  ],
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="mx-auto px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-lg font-semibold text-white">Athera</span>
              </Link>
              <span className="text-sm text-gray-500">/ Docs</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-56 rounded-md border border-gray-800 bg-gray-900 py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Link
                href="/dashboard"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-gray-800 bg-black lg:block`}
        >
          <nav className="p-4">
            {Object.entries(navigation).map(([section, items]) => (
              <div key={section} className="mb-6">
                <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500">
                  {section}
                </h3>
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-gray-800 text-white font-medium'
                              : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <article className="prose prose-invert max-w-none">
              {children}
            </article>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="not-prose border-t border-gray-800 mt-16 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/getting-started/quick-start" className="text-gray-300 hover:text-white transition-colors">
                        Quick Start
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/docs/core-concepts/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                        How It Works
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/troubleshooting/common-issues" className="text-gray-300 hover:text-white transition-colors">
                        Troubleshooting
                      </Link>
                    </li>
                    <li>
                      <a href="https://github.com/yourusername/athera" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        Discord
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        Telegram
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="text-gray-300 hover:text-white transition-colors">
                        Security
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-300">
                    © {new Date().getFullYear()} Athera. All rights reserved.
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>Built on Base</span>
                  <span>•</span>
                  <span>Powered by Chainlink</span>
                </div>
              </div>
            </div>
      </footer>
    </div>
  )
}
