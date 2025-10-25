'use client'

import { Section } from './Section'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "How does Athera work?",
      answer: "You create a vault and add beneficiaries. If you don't ping your vault for a set period (you choose the duration), the smart contract automatically distributes your crypto to your beneficiaries. Your crypto stays in your wallet the whole time."
    },
    {
      question: "Do you have custody of my crypto?",
      answer: "No. Your crypto never leaves your wallet. We can't access, freeze, or move your funds. The smart contract only executes when the inactivity period is reached."
    },
    {
      question: "What if I want to cancel or change beneficiaries?",
      answer: "You can update beneficiaries, change the inactivity period, or withdraw your funds anytime. You have complete control until the smart contract executes."
    },
    {
      question: "How do beneficiaries claim their crypto?",
      answer: "When the inactivity period is reached, anyone can trigger the distribution. The smart contract automatically sends the crypto to each beneficiary's wallet based on the percentages you set."
    },
    {
      question: "What happens if I'm just on vacation?",
      answer: "Just ping your vault before you leave or when you get back. It takes one click. You can also set a longer inactivity period if you travel frequently."
    }
  ]

  return (
    <Section id="faq" className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Frequently asked questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-900 bg-gray-950/50 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-900/50 transition-colors"
              >
                <span className="text-base font-medium text-white pr-8">
                  {faq.question}
                </span>
                <span className="text-gray-500 text-lg flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-gray-900">
                  <p className="text-gray-400 pt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
