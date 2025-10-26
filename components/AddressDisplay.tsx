'use client'

import { useBasename } from '../hooks/useBasename'
import { formatAddress } from '../lib/basename'

interface AddressDisplayProps {
  address: string
  isTestnet?: boolean
  className?: string
}

export function AddressDisplay({ address, isTestnet = true, className = '' }: AddressDisplayProps) {
  const { basename, loading } = useBasename(address, isTestnet)

  if (loading) {
    return <span className={className}>{formatAddress(address)}</span>
  }

  return (
    <span className={className} title={address}>
      {formatAddress(address, basename)}
    </span>
  )
}
