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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0d1f16]/55 p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <section
        className="w-full max-w-[500px] rounded-[5px] bg-white p-[22px] shadow-[0_24px_70px_rgba(0,0,0,0.2)] dark:border dark:border-[#34463a] dark:bg-[#1a261f]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        <div className="mb-4 flex items-start justify-between gap-3 dark:border-[#34463a]">
          <h2
            id="modal-heading"
            className="mt-1 mb-0 font-serif text-[22px] font-medium tracking-[-0.035em] text-[#252e28] dark:text-[#edf4ef]"
          >
            {title}
          </h2>
          <button
            className="inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-[#536157] hover:bg-[#eef2ed] dark:text-[#b2beb5] dark:hover:bg-[#223128]"
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
