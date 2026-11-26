import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  text?: string
  action?: ReactNode
  titleClassName?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  titleClassName = '',
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6 max-md:mb-6 max-md:items-start">
      <div>
        <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
          {eyebrow}
        </span>
        <h2
          className={`mt-2.5 mb-2.5 font-serif text-[clamp(31px,3vw,42px)] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:text-[32px] ${titleClassName}`}
        >
          {title}
        </h2>
        {text && (
          <p className="mb-0 max-w-[590px] text-[13px] leading-[1.7] text-muted">{text}</p>
        )}
      </div>
      {action}
    </div>
  )
}
