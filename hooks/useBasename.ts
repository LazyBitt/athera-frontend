import { useState, useEffect } from 'react'
import { getBasename } from '../lib/basename'

export function useBasename(address: string | undefined, isTestnet = true) {
  const [basename, setBasename] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) {
      setBasename(null)
      return
    }

    setLoading(true)
    getBasename(address, isTestnet)
      .then(setBasename)
      .finally(() => setLoading(false))
  }, [address, isTestnet])

  return { basename, loading }
}
