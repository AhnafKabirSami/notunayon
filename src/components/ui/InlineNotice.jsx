import { CheckCircle2 } from 'lucide-react'

export default function InlineNotice({ text }) {
  return (
    <div className="inline-notice">
      <CheckCircle2 size={17} /> {text}
    </div>
  )
}
