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
      className={`mt-2.5 flex items-center gap-2 rounded-[3px] border border-[#dce8d6] bg-[#edf3e9] px-3 py-2.5 text-[9px] leading-[1.5] text-[#5f715f] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2] ${className}`}
    >
      <CheckCircle2 size={17} /> {text}
    </div>
  )
}
