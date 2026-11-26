import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'

interface ChatInputProps {
  disabled: boolean
  onSend: (message: string) => void
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = value.trim()
    if (!message || disabled) return
    onSend(message)
    setValue('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form className="notu-chat-input" onSubmit={submit}>
      <textarea
        aria-label={t('chatbot.name')}
        placeholder={t('chatbot.placeholder')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={1000}
        disabled={disabled}
      />
      <button type="submit" aria-label={t('chatbot.send')} disabled={!value.trim() || disabled}>
        <Send size={17} />
      </button>
    </form>
  )
}
