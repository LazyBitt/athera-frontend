'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { ShieldCheck, Lock, Eye, CheckCircle2, AlertTriangle, Code, Zap, Database } from 'lucide-react'

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "Smart Contract Audits",
      description: "Multiple security audits by leading blockchain security firms",
      details: "Comprehensive code review and penetration testing",
      color: "text-primary"
    },
    {
      icon: Lock,
      title: "Non-Custodial Design",
      description: "You maintain full control of your private keys",
      details: "No central authority can access your funds",
      color: "text-accent"
    },
    {
      icon: Eye,
      title: "Open Source",
      description: "Fully transparent and verifiable codebase",
      details: "Community-driven development and security reviews",
      color: "text-highlight"
    },
    {
      icon: CheckCircle2,
      title: "Battle-Tested",
      description: "Proven in production with zero security incidents",
      details: "Extensive testing and formal verification",
      color: "text-green-500"
    }
  ]

  const technicalSpecs = [
    {
      icon: Code,
      title: "Solidity Smart Contracts",
      description: "Written in Solidity with best practices",
      badge: "v0.8.19+"
    },
    {
      icon: Zap,
      title: "Gas Optimized",
      description: "Efficient gas usage for cost-effective operations",
      badge: "Low Cost"
    },
    {
      icon: Database,
      title: "Immutable Logic",
      description: "Once deployed, contract logic cannot be changed",
      badge: "Trustless"
    }
  ]

  return (
    <Section id="security" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Security Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is built with security-first principles to protect your digital assets.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-2">
                {feature.description}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {feature.details}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-background/50 border border-border/50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Technical Excellence
            </h3>
            <p className="text-muted-foreground">
              Built with cutting-edge blockchain technology and security best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSpecs.map((spec, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-surface/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <spec.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  {spec.badge}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {spec.title}
                </h4>
                <p className="text-muted-foreground">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-semibold">Security Audited</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-accent" />
              <span className="font-semibold">Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-highlight" />
              <span className="font-semibold">Non-Custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-semibold">Battle-Tested</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}


