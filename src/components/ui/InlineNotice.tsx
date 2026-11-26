import { CheckCircle2 } from 'lucide-react'

export default function InlineNotice({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <div
      className={`mt-2.5 flex items-center gap-2 rounded-[3px] border border-line bg-surface-tint px-3 py-2.5 text-[9px] leading-[1.5] text-chip-text ${className}`}
    >
      <CheckCircle2 size={17} /> {text}
    </div>
  )
}
