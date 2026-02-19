import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'small'
  background?: 'white' | 'gray' | 'gradient'
  id?: string
}

export default function Section({
  children,
  className = '',
  size = 'default',
  background = 'white',
  id
}: SectionProps) {
  const sizeClasses = {
    default: 'section',
    small: 'section-sm'
  }

  const backgroundClasses = {
    white: 'bg-lavender',
    gray: 'bg-lavender',
    gradient: 'bg-gradient-hero text-white'
  }

  return (
    <section
      id={id}
      className={`${sizeClasses[size]} ${backgroundClasses[background]} ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  )
}

