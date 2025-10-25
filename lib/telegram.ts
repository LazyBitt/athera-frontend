import axios from 'axios'

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN

export async function sendTelegramNotification(
  chatId: string,
  message: string
): Promise<boolean> {
  if (!BOT_TOKEN) {
    console.warn('Telegram bot token not configured')
    return false
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }
    )
    return response.data.ok
  } catch (error) {
    console.error('Telegram notification error:', error)
    return false
  }
}

export async function notifyCountdownWarning(
  chatId: string,
  vaultAddress: string,
  hoursRemaining: number
): Promise<boolean> {
  const message = `
⚠️ <b>Athera Vault Alert</b>

Your vault is approaching the distribution deadline.

<b>Vault:</b> <code>${vaultAddress.slice(0, 10)}...${vaultAddress.slice(-8)}</code>
<b>Time Remaining:</b> ${hoursRemaining} hours

Please check in to reset the countdown if you're still active.
  `.trim()

  return sendTelegramNotification(chatId, message)
}

export async function notifyInheritanceExecuted(
  chatId: string,
  vaultAddress: string,
  amount: string
): Promise<boolean> {
  const message = `
✅ <b>Inheritance Distributed</b>

An inheritance vault has been successfully distributed.

<b>Vault:</b> <code>${vaultAddress.slice(0, 10)}...${vaultAddress.slice(-8)}</code>
<b>Amount:</b> ${amount} ETH

The funds have been transferred to the designated beneficiaries.
  `.trim()

  return sendTelegramNotification(chatId, message)
}

export async function notifyVaultCreated(
  chatId: string,
  vaultAddress: string
): Promise<boolean> {
  const message = `
🎉 <b>Vault Created Successfully</b>

Your new inheritance vault is now active.

<b>Vault Address:</b> <code>${vaultAddress}</code>

You can manage it from your Athera dashboard.
  `.trim()

  return sendTelegramNotification(chatId, message)
}
