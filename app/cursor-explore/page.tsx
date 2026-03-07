'use client'

// ──────────────────────────────────────────────────────────
// Cursor Explorer — Awwwards-quality cursor style showcase
// Hover each card to preview the cursor. Each cursor is an
// inline SVG data URI with proper URL encoding.
// ──────────────────────────────────────────────────────────

interface CursorDefinition {
  name: string
  description: string
  /** CSS cursor value — url("data:image/svg+xml,...") x y, auto */
  cursor: string
  /** Inline SVG markup for the 3–4x scaled preview */
  previewSvg: string
}

const cursors: CursorDefinition[] = [
  // 1. Minimal Dot (current)
  {
    name: 'Minimal Dot',
    description: 'Current default — 12px white filled circle with subtle dark stroke',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'%3E%3Ccircle cx=\'6\' cy=\'6\' r=\'5\' fill=\'white\' stroke=\'rgba(0,0,0,0.15)\' stroke-width=\'0.5\'/%3E%3C/svg%3E") 6 6, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5" fill="white" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>
    </svg>`,
  },

  // 2. Ring
  {
    name: 'Ring',
    description: '16px hollow white circle — stroke only, no fill, 1.5px stroke',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Ccircle cx=\'8\' cy=\'8\' r=\'6.5\' fill=\'none\' stroke=\'white\' stroke-width=\'1.5\'/%3E%3C/svg%3E") 8 8, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="white" stroke-width="1.5"/>
    </svg>`,
  },

  // 3. Crosshair
  {
    name: 'Crosshair',
    description: '20px cross lines — thin white lines intersecting at center',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Cline x1=\'10\' y1=\'2\' x2=\'10\' y2=\'18\' stroke=\'white\' stroke-width=\'1\' stroke-linecap=\'round\'/%3E%3Cline x1=\'2\' y1=\'10\' x2=\'18\' y2=\'10\' stroke=\'white\' stroke-width=\'1\' stroke-linecap=\'round\'/%3E%3C/svg%3E") 10 10, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 20 20">
      <line x1="10" y1="2" x2="10" y2="18" stroke="white" stroke-width="1" stroke-linecap="round"/>
      <line x1="2" y1="10" x2="18" y2="10" stroke="white" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
  },

  // 4. Diamond
  {
    name: 'Diamond',
    description: '10px white rotated square — elegant diamond shape',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'%3E%3Crect x=\'2\' y=\'2\' width=\'8\' height=\'8\' rx=\'0.5\' fill=\'white\' transform=\'rotate(45 6 6)\'/%3E%3C/svg%3E") 6 6, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 12 12">
      <rect x="2" y="2" width="8" height="8" rx="0.5" fill="white" transform="rotate(45 6 6)"/>
    </svg>`,
  },

  // 5. Arrow Minimal
  {
    name: 'Arrow Minimal',
    description: 'Clean thin white arrow — custom minimal pointer, not the OS default',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'20\'%3E%3Cpath d=\'M3 1 L3 17 L7 13 L12 18\' fill=\'none\' stroke=\'white\' stroke-width=\'1.2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3Cpath d=\'M3 1 L3 17 L7 13 L3 1Z\' fill=\'white\' fill-opacity=\'0.9\'/%3E%3C/svg%3E") 3 1, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="72" viewBox="0 0 16 20">
      <path d="M3 1 L3 17 L7 13 L12 18" fill="none" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 1 L3 17 L7 13 L3 1Z" fill="white" fill-opacity="0.9"/>
    </svg>`,
  },

  // 6. Dual Ring
  {
    name: 'Dual Ring',
    description: '12px inner circle with a faint 20px outer ring — concentric circles',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\' fill=\'none\' stroke=\'white\' stroke-opacity=\'0.25\' stroke-width=\'0.75\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'4\' fill=\'white\'/%3E%3C/svg%3E") 12 12, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-opacity="0.25" stroke-width="0.75"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>`,
  },

  // 7. Dot + Trail
  {
    name: 'Dot + Trail',
    description: '8px filled dot with a comma-like tail — suggests motion',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'18\'%3E%3Ccircle cx=\'7\' cy=\'5\' r=\'4\' fill=\'white\'/%3E%3Cpath d=\'M7 9 Q8 13 6 17\' stroke=\'white\' stroke-width=\'1.5\' stroke-linecap=\'round\' fill=\'none\' stroke-opacity=\'0.5\'/%3E%3C/svg%3E") 7 5, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="68" viewBox="0 0 14 18">
      <circle cx="7" cy="5" r="4" fill="white"/>
      <path d="M7 9 Q8 13 6 17" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" stroke-opacity="0.5"/>
    </svg>`,
  },

  // 8. Plus
  {
    name: 'Plus',
    description: '14px thin plus sign — clean and precise',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\'%3E%3Cline x1=\'7\' y1=\'2\' x2=\'7\' y2=\'12\' stroke=\'white\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3Cline x1=\'2\' y1=\'7\' x2=\'12\' y2=\'7\' stroke=\'white\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3C/svg%3E") 7 7, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 14 14">
      <line x1="7" y1="2" x2="7" y2="12" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="2" y1="7" x2="12" y2="7" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
  },

  // 9. Dash
  {
    name: 'Dash',
    description: '14px horizontal line — minimal and understated',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'6\'%3E%3Cline x1=\'1\' y1=\'3\' x2=\'13\' y2=\'3\' stroke=\'white\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E") 7 3, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="24" viewBox="0 0 14 6">
      <line x1="1" y1="3" x2="13" y2="3" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 10. Soft Glow
  {
    name: 'Soft Glow',
    description: '12px white dot with soft radial gradient glow — feathered edge',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Cdefs%3E%3CradialGradient id=\'g\'%3E%3Cstop offset=\'0%25\' stop-color=\'white\' stop-opacity=\'1\'/%3E%3Cstop offset=\'40%25\' stop-color=\'white\' stop-opacity=\'0.8\'/%3E%3Cstop offset=\'100%25\' stop-color=\'white\' stop-opacity=\'0\'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'9\' fill=\'url(%23g)\'/%3E%3C/svg%3E") 10 10, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 20 20">
      <defs>
        <radialGradient id="glow-preview">
          <stop offset="0%" stop-color="white" stop-opacity="1"/>
          <stop offset="40%" stop-color="white" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="10" cy="10" r="9" fill="url(#glow-preview)"/>
    </svg>`,
  },

  // 11. Triangle
  {
    name: 'Triangle',
    description: 'Small equilateral triangle pointing up-right — directional and sharp',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\'%3E%3Cpolygon points=\'2,12 7,2 12,12\' fill=\'white\' transform=\'rotate(-30 7 7)\'/%3E%3C/svg%3E") 7 7, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 14 14">
      <polygon points="2,12 7,2 12,12" fill="white" transform="rotate(-30 7 7)"/>
    </svg>`,
  },

  // 12. Square Outline
  {
    name: 'Square Outline',
    description: '10px hollow square with rounded corners — structured and clean',
    cursor:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'%3E%3Crect x=\'1.5\' y=\'1.5\' width=\'9\' height=\'9\' rx=\'2\' fill=\'none\' stroke=\'white\' stroke-width=\'1.2\'/%3E%3C/svg%3E") 6 6, auto',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 12 12">
      <rect x="1.5" y="1.5" width="9" height="9" rx="2" fill="none" stroke="white" stroke-width="1.2"/>
    </svg>`,
  },
]

export default function CursorExplorePage() {
  return (
    <div
      className="min-h-screen bg-[#060e09] px-6 py-16 sm:px-10 md:px-16 lg:px-24"
      style={{ cursor: 'default' }}
    >
      {/* Override the global custom cursor for the entire page */}
      <style>{`
        .cursor-explore-page *,
        .cursor-explore-page *::before,
        .cursor-explore-page *::after {
          cursor: inherit !important;
        }
      `}</style>

      <div className="cursor-explore-page mx-auto max-w-[1400px]">
        {/* Header */}
        <header className="mb-16">
          <h1
            className="mb-3 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne, var(--font-display))' }}
          >
            Cursor Explorer
          </h1>
          <p
            className="text-[15px] text-white/50"
            style={{ fontFamily: 'var(--font-sora, var(--font-sans))' }}
          >
            Hover each card to preview the cursor style. Each is an inline SVG
            data URI.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cursors.map((c) => (
            <CursorCard key={c.name} cursor={c} />
          ))}
        </div>

        {/* Footer note */}
        <footer className="mt-20 border-t border-white/[0.06] pt-8">
          <p
            className="text-[13px] leading-relaxed text-white/30"
            style={{ fontFamily: 'var(--font-sora, var(--font-sans))' }}
          >
            All cursors use inline SVG data URIs with a centered hotspot. To
            apply one globally, copy its CSS cursor value into the{' '}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-white/50">
              globals.css
            </code>{' '}
            custom cursor rule.
          </p>
        </footer>
      </div>
    </div>
  )
}

function CursorCard({ cursor }: { cursor: CursorDefinition }) {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.05]">
      {/* Name + description */}
      <div className="mb-4">
        <h2
          className="mb-1 text-[18px] font-semibold text-white"
          style={{ fontFamily: 'var(--font-syne, var(--font-display))' }}
        >
          {cursor.name}
        </h2>
        <p
          className="text-[13px] leading-snug text-white/50"
          style={{ fontFamily: 'var(--font-sora, var(--font-sans))' }}
        >
          {cursor.description}
        </p>
      </div>

      {/* Hover preview area */}
      <div
        className="relative flex h-[200px] items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 group-hover:border-white/[0.1] group-hover:bg-white/[0.04]"
        style={{ cursor: cursor.cursor }}
      >
        {/* Scaled cursor preview */}
        <div className="pointer-events-none flex flex-col items-center gap-3">
          <div
            className="flex items-center justify-center opacity-40 transition-opacity duration-300 group-hover:opacity-80"
            dangerouslySetInnerHTML={{ __html: cursor.previewSvg }}
          />
          <span
            className="text-[11px] uppercase tracking-[0.15em] text-white/25 transition-colors duration-300 group-hover:text-white/40"
            style={{ fontFamily: 'var(--font-sora, var(--font-sans))' }}
          >
            Hover to preview
          </span>
        </div>

        {/* Corner accent dots */}
        <div className="absolute left-3 top-3 h-1 w-1 rounded-full bg-white/10" />
        <div className="absolute right-3 top-3 h-1 w-1 rounded-full bg-white/10" />
        <div className="absolute bottom-3 left-3 h-1 w-1 rounded-full bg-white/10" />
        <div className="absolute bottom-3 right-3 h-1 w-1 rounded-full bg-white/10" />
      </div>
    </div>
  )
}
