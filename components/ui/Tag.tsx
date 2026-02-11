import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'neutral'
  className?: string
  icon?: ReactNode
}

export default function Tag({ 
  children, 
  variant = 'primary',
  className = '',
  icon 
}: TagProps) {
  const variantClasses = {
    primary: 'tag-primary',
    secondary: 'tag-secondary',
    neutral: 'tag-neutral'
  }

  return (
    <span className={`tag ${variantClasses[variant]} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  )
}

