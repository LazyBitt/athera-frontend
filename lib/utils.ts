import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatTimeRemaining(seconds: number) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

export function formatPercentage(basisPoints: number) {
  return `${(basisPoints / 100).toFixed(1)}%`
}

export function formatBalance(balance: bigint, decimals: number = 18) {
  const divisor = BigInt(10 ** decimals)
  const whole = balance / divisor
  const remainder = balance % divisor
  const decimal = Number(remainder) / Number(divisor)
  
  return `${whole.toString()}.${decimal.toFixed(4).slice(2)}`
}
