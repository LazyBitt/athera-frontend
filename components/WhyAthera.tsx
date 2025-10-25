'use client'

import { Section } from './Section'
import { Heart, Users, Clock, ArrowRight } from 'lucide-react'

export function WhyAthera() {
  const features = [
    {
      icon: Heart,
      title: "Built for Families",
      description: "Designed with your loved ones in mind. Simple setup, lasting protection."
    },
    {
      icon: Users,
      title: "Multiple Beneficiaries", 
      description: "Set custom percentages for each family member. Fair and transparent."
    },
    {
      icon: Clock,
      title: "Automated Distribution",
      description: "Your assets automatically go to your family when you're inactive."
    }
  ]

  return (
    <Section id="about" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Why Athera?
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Every digital asset tells a story. Athera makes sure yours continues — even if you go silent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="card text-center hover:border-accent transition-colors duration-300">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
              <p className="text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Problem Card */}
        <div className="card mb-8 border-red-500/20">
          <h3 className="text-2xl font-bold text-primary mb-6">The Problem</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-red-400 mt-1 text-xl">×</span>
              <div>
                <div className="font-semibold text-primary">Lost Forever</div>
                <div className="text-secondary">Private keys disappear when you die</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 mt-1 text-xl">×</span>
              <div>
                <div className="font-semibold text-primary">No Recovery</div>
                <div className="text-secondary">Forgotten passwords mean lost access</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 mt-1 text-xl">×</span>
              <div>
                <div className="font-semibold text-primary">Inaccessible Wallets</div>
                <div className="text-secondary">Hardware wallets become useless</div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-sm text-secondary">
              <strong className="text-primary">$140+ billion</strong> in crypto assets estimated to be lost due to poor inheritance planning
            </div>
          </div>
        </div>

        {/* Solution Card */}
        <div className="card mb-16 border-green-500/20">
          <h3 className="text-2xl font-bold text-primary mb-6">Our Solution</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1 text-xl">✓</span>
              <div>
                <div className="font-semibold text-primary">Smart Contract Protection</div>
                <div className="text-secondary">Automated distribution via immutable smart contracts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1 text-xl">✓</span>
              <div>
                <div className="font-semibold text-primary">You Keep Control</div>
                <div className="text-secondary">Your private keys stay with you. We can't access your funds.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1 text-xl">✓</span>
              <div>
                <div className="font-semibold text-primary">Automatic Execution</div>
                <div className="text-secondary">Smart contracts execute when you're inactive</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-2xl p-12 border border-accent/20">
            <h3 className="text-3xl font-bold mb-4 text-primary">Ready to Protect Your Legacy?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary">
              Join thousands of families who trust Athera with their most valuable digital assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3">
                Launch App
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
