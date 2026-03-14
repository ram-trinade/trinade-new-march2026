'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from './logo'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type DropdownChild = {
  label: string
  href: string
  description: string
  icon: React.ReactNode
}

type NavItem =
  | { label: string; href: string }
  | { label: string; children: DropdownChild[] }

// --- Dropdown Icons ---
const IconBlog = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M13.5 2.25L15.75 4.5M10.5 15.75H15.75M2.25 12.75L11.625 3.375C12.2463 2.75368 13.2537 2.75368 13.875 3.375C14.4963 3.99632 14.4963 5.00368 13.875 5.625L4.5 15H2.25V12.75Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconAbout = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="6.75" cy="5.25" r="2.25" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="12.75" cy="6.75" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M1.5 15C1.5 12.1005 3.85051 9.75 6.75 9.75C9.64949 9.75 12 12.1005 12 15"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M12 10.5C14.0711 10.5 15.75 12.1789 15.75 14.25"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const IconTeam = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="5" r="2.25" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.75 15.75C3.75 12.85 6.1 10.5 9 10.5C11.9 10.5 14.25 12.85 14.25 15.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="3" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const navItems: NavItem[] = [
  { label: 'PRODUCTS', href: '#products' },
  { label: 'SOLUTIONS', href: '/solutions' },
  {
    label: 'RESOURCES',
    children: [
      {
        label: 'Blog',
        href: '#blog',
        description: 'Explore articles, insights, and updates.',
        icon: <IconBlog />,
      },
    ],
  },
  {
    label: 'COMPANY',
    children: [
      {
        label: 'About',
        href: '/about',
        description: 'Who we are? Learn more about us.',
        icon: <IconAbout />,
      },
      {
        label: 'Team',
        href: '/team',
        description: 'Meet the talented people behind Trinade.',
        icon: <IconTeam />,
      },
    ],
  },
]

/* --- Trigger button for dropdown items (no panel -- panel renders at nav level) --- */
function NavTrigger({
  label,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold tracking-[0.06em] text-[#1a1f1a]/85 transition-colors duration-300 hover:text-[#1a1f1a] rounded-full hover:bg-black/[0.04]"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

/* --- Dropdown content for COMPANY (wide split layout) --- */
function CompanyDropdownContent({ children }: { children: DropdownChild[] }) {
  return (
    <div className="grid grid-cols-2">
      {children.map((child, index) => (
        <motion.a
          key={child.label}
          href={child.href}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={`group/item flex flex-col p-6 h-full transition-colors duration-300 hover:bg-black/[0.03] ${
            index === 0 ? 'border-r border-black/[0.06]' : ''
          }`}
        >
          <div className="mb-4 min-h-[3rem]">
            <div className="text-[15px] font-semibold text-[#1a1f1a]/90 leading-tight mb-1">
              {child.label}
            </div>
            <div className="text-[12px] text-[#1a1f1a]/50 leading-snug">
              {child.description}
            </div>
          </div>
          <div
            className="relative w-full h-[120px] rounded-xl overflow-hidden border border-white/[0.10] mt-auto"
            style={{
              background: index === 0
                ? 'linear-gradient(135deg, #091a14 0%, #0c2e20 30%, #0a3d2e 60%, #071812 100%)'
                : 'linear-gradient(135deg, #0e1a18 0%, #0a2e28 30%, #083830 60%, #091410 100%)',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 280 120"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              {index === 0 ? (
                /* About — interconnected people/nodes network */
                <>
                  {/* Glowing mesh grid */}
                  <defs>
                    <linearGradient id="aboutGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#c8e64e" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Background glow */}
                  <circle cx="140" cy="60" r="55" fill="url(#aboutGlow)" />
                  {/* Main connection lines */}
                  <line x1="70" y1="45" x2="140" y2="35" stroke="#00d4aa" strokeWidth="1" opacity="0.4" />
                  <line x1="140" y1="35" x2="210" y2="50" stroke="#c8e64e" strokeWidth="1" opacity="0.35" />
                  <line x1="70" y1="45" x2="100" y2="80" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
                  <line x1="140" y1="35" x2="160" y2="75" stroke="#c8e64e" strokeWidth="0.8" opacity="0.3" />
                  <line x1="210" y1="50" x2="190" y2="85" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
                  <line x1="100" y1="80" x2="160" y2="75" stroke="#b48237" strokeWidth="0.8" opacity="0.25" />
                  <line x1="160" y1="75" x2="190" y2="85" stroke="#00d4aa" strokeWidth="0.6" opacity="0.2" />
                  <line x1="100" y1="80" x2="190" y2="85" stroke="#c8e64e" strokeWidth="0.6" opacity="0.15" />
                  {/* Secondary connections */}
                  <line x1="40" y1="65" x2="70" y2="45" stroke="#00d4aa" strokeWidth="0.6" opacity="0.2" />
                  <line x1="245" y1="40" x2="210" y2="50" stroke="#c8e64e" strokeWidth="0.6" opacity="0.2" />
                  <line x1="130" y1="100" x2="100" y2="80" stroke="#00d4aa" strokeWidth="0.5" opacity="0.15" />
                  <line x1="130" y1="100" x2="160" y2="75" stroke="#b48237" strokeWidth="0.5" opacity="0.15" />
                  {/* People nodes — larger, glowing */}
                  <circle cx="70" cy="45" r="8" fill="#00d4aa" opacity="0.12" />
                  <circle cx="70" cy="45" r="4.5" fill="#00d4aa" opacity="0.7" />
                  <circle cx="140" cy="35" r="9" fill="#c8e64e" opacity="0.1" />
                  <circle cx="140" cy="35" r="5" fill="#c8e64e" opacity="0.65" />
                  <circle cx="210" cy="50" r="8" fill="#00d4aa" opacity="0.12" />
                  <circle cx="210" cy="50" r="4.5" fill="#00d4aa" opacity="0.7" />
                  <circle cx="100" cy="80" r="7" fill="#b48237" opacity="0.1" />
                  <circle cx="100" cy="80" r="3.5" fill="#b48237" opacity="0.6" />
                  <circle cx="160" cy="75" r="7" fill="#c8e64e" opacity="0.1" />
                  <circle cx="160" cy="75" r="3.5" fill="#c8e64e" opacity="0.55" />
                  <circle cx="190" cy="85" r="6" fill="#00d4aa" opacity="0.1" />
                  <circle cx="190" cy="85" r="3" fill="#00d4aa" opacity="0.6" />
                  {/* Small satellite nodes */}
                  <circle cx="40" cy="65" r="2" fill="#00d4aa" opacity="0.4" />
                  <circle cx="245" cy="40" r="2" fill="#c8e64e" opacity="0.4" />
                  <circle cx="130" cy="100" r="2" fill="#b48237" opacity="0.35" />
                </>
              ) : (
                /* Team — collaborative people network */
                <>
                  <defs>
                    <radialGradient id="teamGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c8e64e" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#c8e64e" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Background glow */}
                  <ellipse cx="140" cy="60" rx="70" ry="45" fill="url(#teamGlow)" />
                  {/* Connection lines between people */}
                  <line x1="65" y1="50" x2="140" y2="40" stroke="#c8e64e" strokeWidth="0.8" opacity="0.3" />
                  <line x1="140" y1="40" x2="215" y2="50" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
                  <line x1="65" y1="50" x2="100" y2="85" stroke="#00d4aa" strokeWidth="0.6" opacity="0.25" />
                  <line x1="215" y1="50" x2="180" y2="85" stroke="#c8e64e" strokeWidth="0.6" opacity="0.25" />
                  <line x1="100" y1="85" x2="140" y2="40" stroke="#b48237" strokeWidth="0.5" opacity="0.2" />
                  <line x1="180" y1="85" x2="140" y2="40" stroke="#b48237" strokeWidth="0.5" opacity="0.2" />
                  <line x1="100" y1="85" x2="180" y2="85" stroke="#00d4aa" strokeWidth="0.6" opacity="0.2" />
                  {/* Person 1 — left */}
                  <circle cx="65" cy="42" r="6" fill="#00d4aa" opacity="0.1" />
                  <circle cx="65" cy="38" r="3.5" fill="#00d4aa" opacity="0.5" />
                  <path d="M55 55 Q60 48, 65 48 Q70 48, 75 55" stroke="#00d4aa" strokeWidth="1" fill="none" opacity="0.4" />
                  {/* Person 2 — center (leader) */}
                  <circle cx="140" cy="30" r="7" fill="#c8e64e" opacity="0.1" />
                  <circle cx="140" cy="26" r="4" fill="#c8e64e" opacity="0.55" />
                  <path d="M128 43 Q134 35, 140 35 Q146 35, 152 43" stroke="#c8e64e" strokeWidth="1.2" fill="none" opacity="0.45" />
                  {/* Person 3 — right */}
                  <circle cx="215" cy="42" r="6" fill="#00d4aa" opacity="0.1" />
                  <circle cx="215" cy="38" r="3.5" fill="#00d4aa" opacity="0.5" />
                  <path d="M205 55 Q210 48, 215 48 Q220 48, 225 55" stroke="#00d4aa" strokeWidth="1" fill="none" opacity="0.4" />
                  {/* Person 4 — bottom left */}
                  <circle cx="100" cy="78" r="5" fill="#b48237" opacity="0.1" />
                  <circle cx="100" cy="75" r="3" fill="#b48237" opacity="0.5" />
                  <path d="M92 88 Q96 82, 100 82 Q104 82, 108 88" stroke="#b48237" strokeWidth="0.8" fill="none" opacity="0.35" />
                  {/* Person 5 — bottom right */}
                  <circle cx="180" cy="78" r="5" fill="#c8e64e" opacity="0.1" />
                  <circle cx="180" cy="75" r="3" fill="#c8e64e" opacity="0.5" />
                  <path d="M172 88 Q176 82, 180 82 Q184 82, 188 88" stroke="#c8e64e" strokeWidth="0.8" fill="none" opacity="0.35" />
                  {/* Small accent dots */}
                  <circle cx="40" cy="70" r="1.5" fill="#00d4aa" opacity="0.3" />
                  <circle cx="245" cy="65" r="1.5" fill="#c8e64e" opacity="0.3" />
                  <circle cx="140" cy="100" r="1.5" fill="#b48237" opacity="0.25" />
                </>
              )}
            </svg>
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 50%, rgba(6,14,9,0.4) 100%)',
              }}
            />
            <span className="absolute bottom-2.5 left-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
              {index === 0 ? 'Our Story' : 'Our People'}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}

/* --- Dropdown content for RESOURCES (split: text left, image right) --- */
function ResourcesDropdownContent({ children }: { children: DropdownChild[] }) {
  const child = children[0]
  return (
    <div className="grid grid-cols-2">
      {/* Left: Text content */}
      <motion.a
        href={child.href}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="group/item flex flex-col justify-between p-6 border-r border-black/[0.06] transition-colors duration-300 hover:bg-black/[0.03]"
      >
        <div>
          <div className="text-[15px] font-semibold text-[#1a1f1a]/90 leading-tight mb-1">
            {child.label}
          </div>
          <div className="text-[12px] text-[#1a1f1a]/50 leading-snug mb-6">
            {child.description}
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1a1f1a]/60 group-hover/item:text-[#1a1f1a]/90 transition-colors duration-300">
          Read the Blog
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover/item:translate-x-0.5">
            <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.a>

      {/* Right: Decorative image */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative p-6"
      >
        <div
          className="relative w-full h-full rounded-xl overflow-hidden border border-white/[0.10]"
          style={{
            background: 'linear-gradient(135deg, #091a14 0%, #0c2e20 30%, #0b3828 60%, #071812 100%)',
          }}
        >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 280 200"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="blogGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c8e64e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#c8e64e" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Background glow */}
          <ellipse cx="140" cy="100" rx="90" ry="60" fill="url(#blogGlow)" />
          {/* Stacked article cards — editorial feel */}
          <rect x="65" y="35" width="60" height="75" rx="5" fill="#00d4aa" fillOpacity="0.06" stroke="#00d4aa" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="75" y1="55" x2="115" y2="55" stroke="#00d4aa" strokeWidth="0.7" opacity="0.4" />
          <line x1="75" y1="62" x2="105" y2="62" stroke="#00d4aa" strokeWidth="0.5" opacity="0.25" />
          <line x1="75" y1="69" x2="110" y2="69" stroke="#00d4aa" strokeWidth="0.5" opacity="0.25" />
          <rect x="75" y="80" width="40" height="20" rx="3" fill="#00d4aa" opacity="0.08" />
          <rect x="110" y="50" width="55" height="70" rx="5" fill="#c8e64e" fillOpacity="0.05" stroke="#c8e64e" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="120" y1="68" x2="155" y2="68" stroke="#c8e64e" strokeWidth="0.7" opacity="0.45" />
          <line x1="120" y1="75" x2="148" y2="75" stroke="#c8e64e" strokeWidth="0.5" opacity="0.3" />
          <line x1="120" y1="82" x2="152" y2="82" stroke="#c8e64e" strokeWidth="0.5" opacity="0.25" />
          <rect x="120" y="92" width="35" height="18" rx="3" fill="#c8e64e" opacity="0.07" />
          <rect x="155" y="42" width="62" height="78" rx="5" fill="#b48237" fillOpacity="0.05" stroke="#b48237" strokeWidth="0.9" strokeOpacity="0.4" />
          <line x1="165" y1="60" x2="207" y2="60" stroke="#b48237" strokeWidth="0.7" opacity="0.45" />
          <line x1="165" y1="67" x2="200" y2="67" stroke="#b48237" strokeWidth="0.5" opacity="0.3" />
          <line x1="165" y1="74" x2="205" y2="74" stroke="#b48237" strokeWidth="0.5" opacity="0.25" />
          <line x1="165" y1="81" x2="195" y2="81" stroke="#b48237" strokeWidth="0.5" opacity="0.2" />
          <rect x="165" y="92" width="42" height="18" rx="3" fill="#b48237" opacity="0.08" />
          {/* Floating accent elements */}
          <circle cx="50" cy="140" r="3" fill="#00d4aa" opacity="0.35" />
          <circle cx="230" cy="50" r="2.5" fill="#c8e64e" opacity="0.35" />
          <circle cx="245" cy="140" r="2" fill="#b48237" opacity="0.3" />
          {/* Subtle connecting flow */}
          <path d="M45 160 Q100 130, 140 150 T240 135" stroke="#00d4aa" strokeWidth="0.6" fill="none" opacity="0.2" />
          <path d="M35 170 Q120 140, 180 160 T260 145" stroke="#c8e64e" strokeWidth="0.5" fill="none" opacity="0.15" />
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(6,14,9,0.4) 100%)' }}
        />
        <span className="absolute bottom-3 left-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
          Insights & Updates
        </span>
        </div>
      </motion.div>
    </div>
  )
}

/* --- Dropdown content for standard items (narrow layout) --- */
function StandardDropdownContent({ children }: { children: DropdownChild[] }) {
  return (
    <div className="p-2.5">
      {children.map((child, index) => (
        <motion.a
          key={child.label}
          href={child.href}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.06,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 hover:bg-black/[0.04] group/item"
        >
          <div className="text-[#1a1f1a]/50 shrink-0">
            {child.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-medium text-[#1a1f1a]/90 leading-tight">
              {child.label}
            </div>
            <div className="text-[12px] text-[#1a1f1a]/45 mt-0.5 leading-snug">
              {child.description}
            </div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#1a1f1a]/20 shrink-0 transition-colors duration-300 group-hover/item:text-[#1a1f1a]/50"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      ))}
    </div>
  )
}

export default function Navigation() {
  const glassRef = useRef<HTMLDivElement>(null)

  // Shared dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDropdown = useCallback((label: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setActiveDropdown(label)
  }, [])

  const closeDropdown = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 220)
  }, [])

  // Keep dropdown open when mouse enters the panel
  const keepOpen = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const el = glassRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: '+=300',
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress

        // Background: frosted white intensifies
        const bgAlpha = 0.52 + 0.20 * p
        el.style.setProperty('--nav-bg', `rgba(255, 255, 255, ${bgAlpha.toFixed(3)})`)

        // Border: 0.40 -> 0.55
        const borderAlpha = 0.40 + 0.15 * p
        el.style.setProperty('--nav-border', `rgba(255, 255, 255, ${borderAlpha.toFixed(3)})`)

        // Blur: 28px -> 36px
        const blur = 28 + 8 * p
        el.style.setProperty('--nav-blur', `${blur.toFixed(1)}px`)

        // Shadow
        const shadowAlpha = 0.08 * p
        el.style.setProperty('--nav-shadow', `0 4px 32px rgba(0, 0, 0, ${shadowAlpha.toFixed(3)})`)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  // Find active dropdown data
  const activeItem = activeDropdown
    ? navItems.find((item) => 'children' in item && item.label === activeDropdown) as
        | { label: string; children: DropdownChild[] }
        | undefined
    : undefined

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-10"
    >
      {/* 3-column grid: Logo LEFT | Pill CENTER | CTA RIGHT */}
      <div
        className="mx-auto grid items-center"
        style={{
          maxWidth: '1600px',
          width: '80%',
          gridTemplateColumns: '1fr auto 1fr',
        }}
      >
        {/* LEFT: Logo + Trinade */}
        <a href="/" className="flex items-center gap-2 shrink-0 justify-self-start hover:opacity-80 transition-opacity duration-200">
          <Logo size={36} className="shrink-0" />
          <span
            className="text-[24px] font-semibold tracking-[-0.02em] text-[#1a1f1a] leading-none whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Trinade
          </span>
        </a>

        {/* CENTER: Frosted glass pill with nav links */}
        <div className="relative justify-self-center">
          <div
            ref={glassRef}
            className="nav-glass flex items-center rounded-full px-2 py-1.5 overflow-visible"
          >
            <div className="flex items-center gap-2">
              {navItems.map((item) =>
                'children' in item ? (
                  <NavTrigger
                    key={item.label}
                    label={item.label}
                    isOpen={activeDropdown === item.label}
                    onOpen={() => openDropdown(item.label)}
                    onClose={closeDropdown}
                  />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-[13px] font-semibold tracking-[0.06em] text-[#1a1f1a]/85 transition-colors duration-300 hover:text-[#1a1f1a] rounded-full hover:bg-black/[0.04]"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Dropdown panel: full pill width, below pill */}
          <AnimatePresence>
            {activeItem && (
              <motion.div
                key={activeItem.label}
                initial={{ opacity: 0, y: 12, scale: 0.97, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(4px)' }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-full left-0 right-0 mt-3 z-[60] rounded-2xl bg-white/[0.60] border border-white/[0.35] shadow-[0_8px_32px_rgba(0,0,0,0.10),0_0_0_1px_rgba(255,255,255,0.2)_inset] overflow-hidden"
                style={{ backdropFilter: 'blur(28px) saturate(1.4)', WebkitBackdropFilter: 'blur(28px) saturate(1.4)' }}
                onMouseEnter={keepOpen}
                onMouseLeave={closeDropdown}
              >
                {activeItem.label === 'COMPANY' ? (
                  <CompanyDropdownContent children={activeItem.children} />
                ) : activeItem.label === 'RESOURCES' ? (
                  <ResourcesDropdownContent children={activeItem.children} />
                ) : (
                  <StandardDropdownContent children={activeItem.children} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Book a Demo CTA */}
        <div className="justify-self-end shrink-0">
          <a
            href="/contact"
            className="group whitespace-nowrap rounded-full pl-5 pr-4 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-[#1a1f1a]/85 transition-all duration-300 hover:text-[#1a1f1a] inline-flex items-center gap-2 border border-white/[0.25] bg-white/[0.35] hover:bg-white/[0.50] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            style={{ backdropFilter: 'blur(16px) saturate(1.3)', WebkitBackdropFilter: 'blur(16px) saturate(1.3)' }}
          >
            Get in touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M5.25 3.5L8.75 7L5.25 10.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
