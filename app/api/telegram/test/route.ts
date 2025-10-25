import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '../../../../lib/telegram'

export async function POST(request: NextRequest) {
  try {
    const { chatId } = await request.json()
    
    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 }
      )
    }
    
    const message = `
🎉 <b>Athera Test Notification</b>

Your Telegram notifications are working correctly!

You'll receive alerts about:
• Vault countdown warnings
• Inheritance distributions
• Important vault updates
    `.trim()
    
    const success = await sendTelegramNotification(chatId, message)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Telegram test error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
