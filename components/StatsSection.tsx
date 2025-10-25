'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { ShieldCheck, UserCheck, Coins, Lock, TrendingUp, Award } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: ShieldCheck,
      value: '$2.4B+',
      label: 'Assets Protected',
      description: 'Total value secured across all vaults',
      color: 'text-primary'
    },
    {
      icon: UserCheck,
      value: '10,000+',
      label: 'Active Users',
      description: 'Trusted by crypto enthusiasts worldwide',
      color: 'text-accent'
    },
    {
      icon: Coins,
      value: '$50M+',
      label: 'Distributed',
      description: 'Successfully distributed to beneficiaries',
      color: 'text-highlight'
    },
    {
      icon: Lock,
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable smart contract execution',
      color: 'text-green-500'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Security Audited',
      description: 'Multiple security audits by leading firms',
      badge: 'Certified'
    },
    {
      icon: TrendingUp,
      title: 'Open Source',
      description: 'Transparent and verifiable codebase',
      badge: 'Verified'
    }
  ]

  return (
    <Section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Platform Statistics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Track the growth and adoption of our crypto inheritance platform.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-background/50 border border-border/50 rounded-2xl p-8 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <achievement.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {achievement.badge}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Smart Contract Audited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Non-Custodial</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}


