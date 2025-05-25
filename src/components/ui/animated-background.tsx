"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const [animateHex, setAnimateHex] = useState(false)

  useEffect(() => {
    setAnimateHex(true)
  }, [])

  // Hex grid background animation variants
  const hexVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: [0.05, 0.1, 0.05],
      transition: {
        delay: i * 0.1,
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    }),
  }

  return (
    <>
      {/* Animated hex grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {animateHex &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i % 5}
              variants={hexVariants}
              initial="hidden"
              animate="visible"
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              }}
            />
          ))}
      </div>

      {/* Connected nodes animation */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="url(#nodeGradient)" strokeWidth="2" />
          <path d="M0,200 Q250,150 500,200 T1000,200" fill="none" stroke="url(#nodeGradient)" strokeWidth="2" />
          <path d="M0,300 Q250,250 500,300 T1000,300" fill="none" stroke="url(#nodeGradient)" strokeWidth="2" />
        </svg>
      </div>
    </>
  )
}
