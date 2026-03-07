import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 30, className = '' }: LogoProps) {
  return (
    <Image
      src="/logo-transparent.png"
      alt="Trinade AI Technologies"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: 'auto' }}
      priority
      aria-label="Trinade logo — Three profiles with neural mesh"
    />
  )
}
