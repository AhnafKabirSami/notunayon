import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles.ts'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}
