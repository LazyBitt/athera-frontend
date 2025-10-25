import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle /start command
    if (body.message?.text === '/start') {
      const chatId = body.message.chat.id
      const firstName = body.message.from.first_name || 'User'
      
      const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      
      if (!BOT_TOKEN) {
        return NextResponse.json({ ok: false })
      }
      
      const message = `
👋 Hi ${firstName}!

Welcome to <b>Athera Vault</b> - Your Digital Inheritance Solution

🔑 <b>Your Chat ID:</b> <code>${chatId}</code>

📋 <b>Setup Instructions:</b>
1. Copy your Chat ID above (tap to copy)
2. Go to Athera Dashboard
3. Click Notifications tab → Settings
4. Paste your Chat ID
5. Click Save and Test

You'll receive alerts about:
• ⚠️ Countdown warnings (3 days, 1 day, 1 hour)
• ❌ Vault expiration
• ✅ Inheritance distributions
• 📝 Important vault updates

Need help? Visit athera.xyz
      `.trim()
      
      // Send welcome message with Chat ID
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      })
    }
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: false })
  }
}
