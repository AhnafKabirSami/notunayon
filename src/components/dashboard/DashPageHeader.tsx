import type { ReactNode } from 'react'

interface DashPageHeaderProps {
  eyebrow: string
  title: string
  text?: string
  action?: ReactNode
}

export default function DashPageHeader({ eyebrow, title, text, action }: DashPageHeaderProps) {
  return (
    <div className="dash-page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  )
}
