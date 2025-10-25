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
    const daysLeft = hoursLeft / 24
    
    // Notify at 3 days
    if (daysLeft <= 3 && daysLeft > 2.95) {
      addNotification({
        type: 'warning',
        message: `⚠️ Vault expires in 3 days! Check in to reset countdown.`,
      })
      
      if (telegramChatId) {
        fetch('/api/telegram/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: telegramChatId,
            type: 'warning',
            vaultAddress,
            hoursRemaining: 72,
          }),
        })
      }
    }
    
    // Notify at 1 day (24 hours)
    if (hoursLeft <= 24 && hoursLeft > 23.9) {
      addNotification({
        type: 'warning',
        message: `⚠️ Vault expires in 24 hours! Check in to reset countdown.`,
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
        message: `🚨 URGENT! Vault expires in 1 hour! Check in NOW!`,
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
    
    // Notify when expired
    if (timeLeft <= 0) {
      addNotification({
        type: 'error',
        message: `❌ Vault expired! Beneficiaries can now claim inheritance.`,
      })
      
      if (telegramChatId) {
        fetch('/api/telegram/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: telegramChatId,
            type: 'expired',
            vaultAddress,
            hoursRemaining: 0,
          }),
        })
      }
    }
  }, [timeUntilDistribution, vaultAddress, executed, address, addNotification, telegramChatId])
}
