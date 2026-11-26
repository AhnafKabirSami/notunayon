import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  title: string
  close: () => void
  children: ReactNode
}

export default function Modal({ title, close, children }: ModalProps) {
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [close])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-backdrop/55 p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <section
        className="w-full max-w-[500px] rounded-[5px] border border-line bg-surface p-[22px] shadow-[0_24px_70px_rgba(0,0,0,0.2)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        <div className="mb-4 flex items-start justify-between gap-3 border-line">
          <h2
            id="modal-heading"
            className="mt-1 mb-0 font-serif text-[22px] font-medium tracking-[-0.035em] text-ink"
          >
            {title}
          </h2>
          <button
            className="inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint"
            onClick={close}
            aria-label="Close dialog"
          >
            <X />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
