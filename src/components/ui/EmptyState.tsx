import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  text: string
  action?: ReactNode
}

export default function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-line-strong bg-surface-subtle px-5 py-9 text-center">
      <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-surface-tint text-eyebrow">
        {icon}
      </span>
      <h3 className="mt-4 mb-1 text-[16px] font-semibold tracking-[-0.03em] text-ink">{title}</h3>
      <p className="mb-4 max-w-[365px] text-[11px] leading-[1.7] text-muted">{text}</p>
      {action}
    </div>
  )
}
