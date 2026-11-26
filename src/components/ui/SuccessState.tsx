import { ArrowRight, Check } from 'lucide-react'

interface SuccessStateProps {
  title: string
  text: string
  close?: () => void
  className?: string
}

export default function SuccessState({ title, text, close, className = '' }: SuccessStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center px-5 py-7 text-center ${className}`}>
      <span className="grid h-[43px] w-[43px] place-items-center rounded-full bg-surface-tint text-eyebrow">
        <Check size={22} />
      </span>
      <h3 className="mt-3 mb-1 text-[16px] font-semibold tracking-[-0.03em] text-ink">{title}</h3>
      <p className="mb-3 max-w-[350px] text-[11px] leading-[1.7] text-muted">{text}</p>
      {close && (
        <button
          className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-[12px] font-[680] text-link hover:text-link-hover"
          onClick={close}
        >
          Continue <ArrowRight size={15} />
        </button>
      )}
    </div>
  )
}
