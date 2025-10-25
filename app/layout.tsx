import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { NotificationProvider } from '../components/NotificationSystem'
import { EventListener } from '../components/EventListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Athera - Decentralized Crypto Inheritance',
  description: 'Secure your digital assets with non-custodial vaults that automatically distribute funds to your beneficiaries when you\'re inactive.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <NotificationProvider>
              <EventListener />
              {children}
            </NotificationProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
