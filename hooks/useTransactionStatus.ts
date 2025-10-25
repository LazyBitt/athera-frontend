'use client'

import { useState, useEffect } from 'react'
import { usePublicClient, useWaitForTransactionReceipt } from 'wagmi'
import { Hash } from 'viem'

interface TransactionStatus {
  status: 'pending' | 'success' | 'error' | 'idle'
  hash?: Hash
  error?: string
  receipt?: any
}

export function useTransactionStatus() {
  const [transactions, setTransactions] = useState<Map<Hash, TransactionStatus>>(new Map())
  const publicClient = usePublicClient()

  const addTransaction = (hash: Hash) => {
    setTransactions(prev => new Map(prev).set(hash, { status: 'pending', hash }))
  }

  const updateTransaction = (hash: Hash, updates: Partial<TransactionStatus>) => {
    setTransactions(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(hash) || { status: 'idle' as const }
      newMap.set(hash, { ...current, ...updates })
      return newMap
    })
  }

  const getTransaction = (hash: Hash): TransactionStatus | undefined => {
    return transactions.get(hash)
  }

  const clearTransaction = (hash: Hash) => {
    setTransactions(prev => {
      const newMap = new Map(prev)
      newMap.delete(hash)
      return newMap
    })
  }

  return {
    transactions: Array.from(transactions.values()),
    addTransaction,
    updateTransaction,
    getTransaction,
    clearTransaction
  }
}

export function useTransactionReceipt(hash: Hash | undefined) {
  const { data: receipt, isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1
  })

  return {
    receipt,
    isLoading,
    isSuccess,
    isError,
    error: error?.message
  }
}

export function useTransactionMonitor(hash: Hash | undefined) {
  const { receipt, isLoading, isSuccess, isError, error } = useTransactionReceipt(hash)
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | 'idle'>('idle')

  useEffect(() => {
    if (isLoading) {
      setStatus('pending')
    } else if (isSuccess) {
      setStatus('success')
    } else if (isError) {
      setStatus('error')
    }
  }, [isLoading, isSuccess, isError])

  return {
    status,
    receipt,
    isLoading,
    isSuccess,
    isError,
    error
  }
}




