import type { ReactNode } from 'react'

interface DashPageHeaderProps {
  eyebrow: string
  title: string
  text?: string
  action?: ReactNode
}

export default function DashPageHeader({ eyebrow, title, text, action }: DashPageHeaderProps) {
  return (
    <div className="mt-0.5 mb-[21px] flex items-end justify-between gap-5 max-md:mb-[15px] max-md:flex-col max-md:items-start max-md:gap-3">
      <div>
        <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
          {eyebrow}
        </span>
        <h1 className="my-[5px] font-serif text-[31px] font-medium tracking-[-0.04em] text-ink max-md:text-[27px]">
          {title}
        </h1>
        {text && (
          <p className="m-0 text-[10px] leading-[1.7] text-muted max-md:text-[9px]">{text}</p>
        )}
      </div>
      {action}
    </div>
  )
}
