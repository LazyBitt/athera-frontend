'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useDashboardStore } from '../store/dashboard'

export function useCountdownMonitor(
  timeUntilDistribution: bigint,
  vaultAddress: string,
  executed: boolean
) {
  const { address } = useAccount()
  const { addNotification, telegramChatId } = useDashboardStore()
  
  useEffect(() => {
    if (executed || !address) return
    
    const timeLeft = Number(timeUntilDistribution)
    const hoursLeft = timeLeft / 3600
    
    // Notify at 24 hours
    if (hoursLeft <= 24 && hoursLeft > 23.9) {
      addNotification({
        type: 'warning',
        message: `Vault ${vaultAddress.slice(0, 10)}... expires in 24 hours!`,
      })
      
      if (telegramChatId) {
        fetch('/api/telegram/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: telegramChatId,
            type: 'warning',
            vaultAddress,
            hoursRemaining: 24,
          }),
        })
      }
    }
    
    // Notify at 1 hour
    if (hoursLeft <= 1 && hoursLeft > 0.95) {
      addNotification({
        type: 'warning',
        message: `Vault ${vaultAddress.slice(0, 10)}... expires in 1 hour!`,
      })
      
      if (telegramChatId) {
        fetch('/api/telegram/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: telegramChatId,
            type: 'warning',
            vaultAddress,
            hoursRemaining: 1,
          }),
        })
      }
    }
  }, [timeUntilDistribution, vaultAddress, executed, address, addNotification, telegramChatId])
}
