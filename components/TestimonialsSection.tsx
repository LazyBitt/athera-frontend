'use client'

import { Section } from './Section'
import { Star, Heart, Users, ArrowRight } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Executive",
      content: "Athera gave me peace of mind knowing my family can access my crypto if something happens to me. The setup was incredibly simple.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen", 
      role: "Crypto Investor",
      content: "Finally, a solution that actually works for crypto inheritance. My wife can now access our digital assets without technical knowledge.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: "Blockchain Developer", 
      content: "As a developer, I appreciate the clean code and security. Athera is the only inheritance solution I trust with my assets.",
      rating: 5,
      avatar: "ER"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Happy Families" },
    { number: "$2.4B+", label: "Assets Protected" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ]

  return (
    <Section className="py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            What Families Say
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Real stories from real families who have secured their digital legacy with Athera.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card hover:border-accent transition-colors duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-secondary">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-secondary leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center card hover:border-accent transition-colors duration-300">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-2xl p-12 border border-accent/20">
            <h3 className="text-3xl font-bold mb-4 text-primary">Ready to Secure Your Legacy?</h3>
            <p className="text-lg text-secondary mb-8">
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


