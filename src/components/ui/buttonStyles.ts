export type ButtonVariant = 'solid' | 'light' | 'outline-light' | 'outline-dark'
export type ButtonSize = 'md' | 'sm'

const baseClasses =
  'inline-flex items-center justify-center gap-2.25 rounded-[4px] border border-transparent font-[680] tracking-[-0.01em] whitespace-nowrap transition duration-150 ease-out hover:-translate-y-px cursor-pointer'

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-[47px] px-[18px] text-[13px]',
  sm: 'min-h-[39px] px-[13px] text-[12px]',
}

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'bg-accent border-accent text-on-accent hover:bg-accent-hover hover:border-accent-hover',
  'outline-dark':
    'text-link border-line-strong bg-transparent hover:bg-surface-tint hover:border-eyebrow',
  light:
    'text-forest-dark bg-white border-white hover:bg-surface-tint hover:border-surface-tint',
  'outline-light':
    'text-white border-white/55 bg-white/[0.04] hover:bg-white/[0.13]',
}

export function buttonClasses({
  variant = 'solid',
  size = 'md',
  className = '',
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}): string {
  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()
}
