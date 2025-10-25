/**
 * Telegram Bot API utility functions for Athera
 * Handles sending notifications to heirs via Telegram
 */

export interface TelegramMessage {
  chatId: string
  message: string
}

export interface TelegramResponse {
  success: boolean
  messageId?: number
  chatId?: number
  timestamp?: string
  error?: string
}

/**
 * Send a message via Telegram Bot API
 * @param message - The message to send
 * @returns Promise with the response
 */
export async function sendTelegramMessage(message: TelegramMessage): Promise<TelegramResponse> {
  try {
    const response = await fetch('/api/sendTelegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send Telegram message')
    }

    return data
  } catch (error) {
    console.error('Telegram API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Send inheritance notification to heir
 * @param heir - Heir information
 * @param vaultAddress - Vault address
 * @param amount - Amount to be distributed
 */
export async function sendInheritanceNotification(
  heir: { telegramChatId?: string; email?: string },
  vaultAddress: string,
  amount: string
): Promise<TelegramResponse> {
  if (!heir.telegramChatId) {
    return {
      success: false,
      error: 'No Telegram chat ID provided'
    }
  }

  const message = `
🔔 **Athera Inheritance Notification**

Your inheritance distribution has been triggered from vault:
\`${vaultAddress}\`

💰 **Amount**: ${amount} ETH

This distribution was triggered due to the vault owner's inactivity period. Please check your wallet for the received funds.

For support, visit: https://athera.io/support
  `.trim()

  return sendTelegramMessage({
    chatId: heir.telegramChatId,
    message
  })
}

/**
 * Send activity warning notification
 * @param chatId - Telegram chat ID
 * @param daysSinceActivity - Days since last activity
 */
export async function sendActivityWarning(
  chatId: string,
  daysSinceActivity: number
): Promise<TelegramResponse> {
  const message = `
⚠️ **Athera Activity Warning**

Your vault has been inactive for ${daysSinceActivity} days.

To prevent automatic distribution, please interact with your vault soon by:
• Making a transaction
• Pinging your vault
• Updating vault settings

Visit your dashboard: https://athera.io/dashboard
  `.trim()

  return sendTelegramMessage({
    chatId,
    message
  })
}

/**
 * Send vault creation confirmation
 * @param chatId - Telegram chat ID
 * @param vaultAddress - New vault address
 */
export async function sendVaultCreationConfirmation(
  chatId: string,
  vaultAddress: string
): Promise<TelegramResponse> {
  const message = `
✅ **Athera Vault Created Successfully**

Your crypto inheritance vault has been created:
\`${vaultAddress}\`

Your vault is now active and monitoring your wallet activity. You can manage your heirs and settings in the dashboard.

Dashboard: https://athera.io/dashboard
  `.trim()

  return sendTelegramMessage({
    chatId,
    message
  })
}


