import { ArrowRight, Check } from 'lucide-react'

interface SuccessStateProps {
  title: string
  text: string
  close?: () => void
}

export default function SuccessState({ title, text, close }: SuccessStateProps) {
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
