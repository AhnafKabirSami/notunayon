import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ title, close, children }) {
  useEffect(() => {
    function handle(e) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [close])

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-heading">
        <div className="modal-head">
          <h2 id="modal-heading">{title}</h2>
          <button className="icon-button" onClick={close} aria-label="Close dialog">
            <X />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
