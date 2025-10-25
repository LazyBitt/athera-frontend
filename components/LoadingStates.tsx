'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Shield, Clock, DollarSign } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, message = 'Loading...', children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary mb-4" />
            <p className="text-foreground font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

interface LoadingCardProps {
  isLoading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
}

export function LoadingCard({ isLoading, children, skeleton }: LoadingCardProps) {
  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-6">
        {skeleton || <VaultSkeleton />}
      </div>
    )
  }

  return <>{children}</>
}

function VaultSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-muted rounded-xl animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-muted rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded animate-pulse" />
        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
      </div>
      
      <div className="flex gap-2">
        <div className="h-8 bg-muted rounded w-20 animate-pulse" />
        <div className="h-8 bg-muted rounded w-24 animate-pulse" />
      </div>
    </div>
  )
}

interface TransactionLoadingProps {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  children: React.ReactNode
}

export function TransactionLoading({ isPending, isSuccess, isError, children }: TransactionLoadingProps) {
  if (isPending) {
    return (
      <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
        <LoadingSpinner className="text-primary" />
        <div>
          <p className="font-medium text-foreground">Transaction Pending</p>
          <p className="text-sm text-muted-foreground">Please wait while we process your transaction...</p>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
      >
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-foreground">Transaction Successful</p>
          <p className="text-sm text-muted-foreground">Your transaction has been confirmed!</p>
        </div>
      </motion.div>
    )
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
      >
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-foreground">Transaction Failed</p>
          <p className="text-sm text-muted-foreground">Please try again or contact support.</p>
        </div>
      </motion.div>
    )
  }

  return <>{children}</>
}

interface VaultLoadingAnimationProps {
  isActive: boolean
}

export function VaultLoadingAnimation({ isActive }: VaultLoadingAnimationProps) {
  if (!isActive) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Shield className="h-8 w-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Processing Vault
        </h3>
        <p className="text-muted-foreground mb-6">
          Setting up your secure inheritance vault...
        </p>
        
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-accent rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-highlight rounded-full"
          />
        </div>
      </div>
    </div>
  )
}




