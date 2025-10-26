'use client'

import { Section } from './Section'
import { motion } from 'framer-motion'

export function UseCases() {
  const cases = [
    {
      emoji: '💼',
      title: 'Crypto Investors',
      description: 'Protect $10K+ in holdings',
      scenario: 'Sarah has 5 ETH on Base. She sets up a 6-month vault with her spouse and kids as beneficiaries.'
    },
    {
      emoji: '🏗️',
      title: 'DeFi Power Users',
      description: 'Secure yield farming positions',
      scenario: 'Mike farms on Base protocols. His vault ensures his family can access his positions if something happens.'
    },
    {
      emoji: '👨‍👩‍👧',
      title: 'Families',
      description: 'Plan digital inheritance',
      scenario: 'The Chen family uses Athera to ensure their crypto passes to the next generation without legal hassle.'
    }
  ]

  return (
    <Section className="py-24 bg-gray-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who Uses Athera?
          </h2>
          <p className="text-gray-400 text-lg">
            Real people protecting real assets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="text-5xl mb-4">{c.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
              <p className="text-blue-400 text-sm mb-4">{c.description}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {c.scenario}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
