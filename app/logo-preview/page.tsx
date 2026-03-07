'use client'

const variations = [
  {
    file: '/logo-variations/v1-connected-trio.svg',
    name: 'V1: Connected Trio',
    basis: 'Refined from reference',
    desc: '3 figures with organic S-curve bodies, flowing arc connection instead of rigid bar. Center figure taller. Teal dot at center.',
  },
  {
    file: '/logo-variations/v2-trinity-circle.svg',
    name: 'V2: Trinity Circle',
    basis: 'Triangular arrangement',
    desc: '3 figures at 120° intervals around an implied circle, facing inward. Connecting arcs form a triangular bond. Teal center.',
  },
  {
    file: '/logo-variations/v3-overlapping-silhouettes.svg',
    name: 'V3: Overlapping Silhouettes',
    basis: 'Editorial layering',
    desc: '3 head+shoulder silhouettes overlapping left-to-right with graded opacity (0.3/0.6/1.0). Fanning-card depth effect. Teal accent.',
  },
  {
    file: '/logo-variations/v4-abstract-pillars.svg',
    name: 'V4: Abstract Pillars',
    basis: 'Architectural',
    desc: '3 vertical pillar forms with rounded head caps at varying heights. Shared base platform. Teal crown on tallest pillar.',
  },
  {
    file: '/logo-variations/v5-unity-mark.svg',
    name: 'V5: Unity Mark',
    basis: 'Unified glyph',
    desc: '3 heads in crown cluster atop shared body that splits into 3 converging stems. Reads as one symbol. Teal at convergence.',
  },
]

export default function LogoPreview() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '60px 40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontSize: '13px', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '8px', fontWeight: 400 }}>
          TRINADE AI
        </h1>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: 300, marginBottom: '48px', letterSpacing: '-0.02em' }}>
          Logo Variations — 3 Persons, No Neural Mesh
        </h2>

        {/* Large previews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
          {variations.slice(0, 3).map((v) => (
            <div key={v.name} style={{ background: '#111', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <img src={v.file} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{v.name}</h3>
                <p style={{ color: '#00d4aa', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500 }}>{v.basis}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '60px' }}>
          {variations.slice(3).map((v) => (
            <div key={v.name} style={{ background: '#111', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <img src={v.file} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{v.name}</h3>
                <p style={{ color: '#00d4aa', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500 }}>{v.basis}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Size comparison strip */}
        <h3 style={{ color: '#fff', fontSize: '13px', letterSpacing: '0.12em', opacity: 0.4, marginBottom: '24px', fontWeight: 400 }}>
          SCALABILITY TEST
        </h3>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'end', flexWrap: 'wrap' }}>
          {variations.map((v) => (
            <div key={v.name} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'end', marginBottom: '8px' }}>
                <img src={v.file} alt="" width={120} height={120} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }} />
                <img src={v.file} alt="" width={48} height={48} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }} />
                <img src={v.file} alt="" width={32} height={32} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '3px' }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>{v.name.split(':')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
