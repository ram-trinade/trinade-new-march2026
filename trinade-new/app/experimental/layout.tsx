'use client'

export default function ExperimentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* EXP Badge — fixed top-right, below navbar logo */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 99999,
          padding: '5px 12px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: '#c9a86e',
          background: 'linear-gradient(165deg, rgba(185,155,100,0.22) 0%, rgba(201,168,110,0.12) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201,168,110,0.35)',
          borderRadius: '100px',
          pointerEvents: 'none',
          userSelect: 'none',
          boxShadow: '0 4px 16px rgba(160,120,50,0.15)',
        }}
      >
        EXP
      </div>
    </>
  )
}
