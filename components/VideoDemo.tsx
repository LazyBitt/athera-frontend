'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { Play } from 'lucide-react'
import { useState } from 'react'

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Section id="demo" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            See Athera in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch how easy it is to secure your crypto inheritance in under 2 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-500/20">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 mb-4 mx-auto"
                    >
                      <Play className="h-10 w-10 text-white ml-1" />
                    </button>
                    <p className="text-white font-semibold text-lg">Watch Demo</p>
                    <p className="text-gray-400 text-sm">2 minutes</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white">
                  🎥 Product Demo
                </div>
                <div className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-blue-400 border border-blue-500/30">
                  Live on Base
                </div>
              </>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                title="Athera Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Features Below Video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-blue-500 font-bold text-2xl mb-2">60s</div>
              <p className="text-gray-400">Setup Time</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-blue-500 font-bold text-2xl mb-2">0</div>
              <p className="text-gray-400">Technical Knowledge Required</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-blue-500 font-bold text-2xl mb-2">100%</div>
              <p className="text-gray-400">Non-Custodial</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
