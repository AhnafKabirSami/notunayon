import { ArrowRight, Check } from 'lucide-react'

export default function SuccessState({ title, text, close }) {
  return (
    <div className="success-state">
      <span>
        <Check size={22} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {close && (
        <button className="text-link" onClick={close}>
          Continue <ArrowRight size={15} />
        </button>
      )}
    </div>
  )
}
