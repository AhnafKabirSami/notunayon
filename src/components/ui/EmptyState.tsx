import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  text: string
  action?: ReactNode
}

export default function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-[#d9e2d8] bg-[#fafbf9] px-5 py-9 text-center dark:border-[#34463a] dark:bg-[#1a261f]">
      <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-[#eaf1e9] text-[#66836b] dark:bg-[#223128] dark:text-[#a6c5ab]">
        {icon}
      </span>
      <h3 className="mt-4 mb-1 text-[16px] font-semibold tracking-[-0.03em] text-[#252e28] dark:text-[#edf4ef]">
        {title}
      </h3>
      <p className="mb-4 max-w-[365px] text-[11px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
        {text}
      </p>
      {action}
    </div>
  )
}
