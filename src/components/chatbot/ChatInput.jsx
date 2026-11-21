import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ChatInput({ disabled, onSend }) {
  const [value, setValue] = useState('')

  function submit(event) {
    event.preventDefault()
    const message = value.trim()
    if (!message || disabled) return
    onSend(message)
    setValue('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form className="notu-chat-input" onSubmit={submit}>
      <textarea
        aria-label="Write a message to Notu AI"
        placeholder="Ask about materials or suppliers…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={1000}
        disabled={disabled}
      />
      <button type="submit" aria-label="Send message" disabled={!value.trim() || disabled}>
        <Send size={17} />
      </button>
    </form>
  )
}
