import { CheckCircle2 } from 'lucide-react'

export default function InlineNotice({ text }: { text: string }) {
  return (
    <div className="inline-notice">
      <CheckCircle2 size={17} /> {text}
    </div>
  )
}
