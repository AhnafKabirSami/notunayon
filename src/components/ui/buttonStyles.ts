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
    'bg-[#173b2d] border-[#173b2d] text-white hover:bg-[#27563d] hover:border-[#27563d] dark:bg-[#a8c5ad] dark:border-[#a8c5ad] dark:text-[#102016] dark:hover:bg-[#b8d3bd] dark:hover:border-[#b8d3bd]',
  'outline-dark':
    'text-[#173b2d] border-[#b7c4b8] bg-transparent hover:bg-[#edf2ed] hover:border-[#829986] dark:text-[#dbe8df] dark:border-[#6f8877] dark:hover:bg-[#223128]',
  light:
    'text-[#173b2d] bg-white border-white hover:bg-[#e9f0e9] hover:border-[#e9f0e9] dark:text-[#102016] dark:bg-white dark:hover:bg-[#e9f0e9]',
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
