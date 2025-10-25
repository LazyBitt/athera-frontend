import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '../../../../lib/telegram'

export async function POST(request: NextRequest) {
  try {
    const { chatId } = await request.json()
    
    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID diperlukan' },
        { status: 400 }
      )
    }
    
    const message = `
🎉 <b>Athera Test Notification</b>

Your Telegram notifications are working properly!

You will receive notifications about:
• Vault countdown warnings
• Inheritance distributions
• Update penting vault
    `.trim()
    
    const success = await sendTelegramNotification(chatId, message)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Chat not found. Make sure the bot is activated by sending /start to your bot.' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Telegram test error:', error)
    
    // Berikan pesan error yang lebih spesifik
    const errorMessage = error?.response?.data?.description || 'Internal server error'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
