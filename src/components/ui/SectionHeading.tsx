import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  text?: string
  action?: ReactNode
}

export default function SectionHeading({ eyebrow, title, text, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  )
}
