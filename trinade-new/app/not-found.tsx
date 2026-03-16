'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background spiral lines image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/spiral-lines-gold.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.08 }}
          priority
        />
      </div>

      {/* Gold gradient orb for atmosphere */}
      <div
        className="absolute z-[1] rounded-full blur-[120px]"
        style={{
          width: 'clamp(300px, 40vw, 600px)',
          height: 'clamp(300px, 40vw, 600px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, rgba(201,168,110,0.02) 50%, transparent 70%)',
        }}
      />

      {/* Giant 404 background text */}
      <motion.div
        className="absolute z-[2] select-none pointer-events-none"
        style={{
          fontSize: 'clamp(300px, 45vw, 600px)',
          fontWeight: 800,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.04)',
          fontFamily: 'var(--font-sans)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
      >
        404
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-[3] flex flex-col items-center text-center px-6">
        <motion.h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.93)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          Page not found
        </motion.h1>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        >
          <Link
            href="/"
            className="inline-block transition-all duration-300"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'rgba(212,187,138,0.9)',
              border: '1px solid rgba(201,168,110,0.5)',
              padding: '14px 36px',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201,168,110,0.12)'
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.7)'
              e.currentTarget.style.color = 'rgba(212,187,138,1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.5)'
              e.currentTarget.style.color = 'rgba(212,187,138,0.9)'
            }}
          >
            Return to Home
          </Link>
        </motion.div>
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[10] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}
