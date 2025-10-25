import { NextRequest, NextResponse } from 'next/server'
import { notifyCountdownWarning, notifyInheritanceExecuted } from '../../../../lib/telegram'

export async function POST(request: NextRequest) {
  try {
    const { chatId, type, vaultAddress, hoursRemaining, amount } = await request.json()
    
    if (!chatId || !type || !vaultAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    let success = false
    
    if (type === 'warning' && hoursRemaining !== undefined) {
      success = await notifyCountdownWarning(chatId, vaultAddress, hoursRemaining)
    } else if (type === 'executed' && amount) {
      success = await notifyInheritanceExecuted(chatId, vaultAddress, amount)
    } else {
      return NextResponse.json(
        { error: 'Invalid notification type or missing parameters' },
        { status: 400 }
      )
    }
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Telegram notify error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
