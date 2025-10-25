'use client'

import { useEffect } from 'react'
import { usePublicClient, useAccount } from 'wagmi'
import { FACTORY_ABI, VAULT_ABI } from '../lib/contracts'
import { useNotifications } from './NotificationSystem'

export function EventListener() {
  const publicClient = usePublicClient()
  const { address } = useAccount()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (!publicClient || !address) return

    const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`
    if (!factoryAddress) return

    // Listen for VaultCreated events
    const unwatch = (publicClient as any).watchContractEvent({
      address: factoryAddress,
      abi: FACTORY_ABI,
      eventName: 'VaultCreated',
      onLogs: (logs: any) => {
        logs.forEach((log: any) => {
          if (log.args?.owner === address) {
            addNotification({
              type: 'success',
              title: 'Vault Created',
              message: `Your new vault has been created successfully`,
              duration: 8000,
            })
          }
        })
      },
    })

    return () => {
      unwatch()
    }
  }, [publicClient, address, addNotification])

  return null
}
