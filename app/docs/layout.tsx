'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black">
        <div className="mx-auto px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-sm text-gray-400 hover:text-white"
              >
                {sidebarOpen ? '✕' : '☰'}
              </button>
              <Link href="/" className="text-sm font-medium">
                Athera
              </Link>
              <span className="text-sm text-gray-600">/</span>
              <span className="text-sm text-gray-400">Docs</span>
            </div>

            <Link
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-white"
            >
              Dashboard →
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-56 overflow-y-auto border-r border-gray-800 bg-black lg:block`}
        >
          <nav className="p-6">
            {Object.entries(navigation).map(([section, items]) => (
              <div key={section} className="mb-8">
                <div className="mb-2 text-xs font-medium text-gray-500">
                  {section}
                </div>
                <ul className="space-y-1">
                  {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`block px-2 py-1 text-sm ${
                            isActive
                              ? 'text-white'
                              : 'text-gray-400 hover:text-white'
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
          <div className="mx-auto max-w-3xl px-6 py-12">
            <article className="prose prose-invert prose-sm max-w-none">
              {children}
            </article>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="not-prose border-t border-gray-800 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-400">
            <div>
              © {new Date().getFullYear()} Athera
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/yourusername/athera" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-white">
                Discord
              </a>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
