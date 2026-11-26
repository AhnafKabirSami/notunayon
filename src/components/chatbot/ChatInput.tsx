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
    <form
      className="flex min-h-[44px] items-center gap-1.5 rounded-[5px] border border-input-border bg-chat-bubble py-1 pr-[5px] pl-2.5 text-ink transition duration-150 focus-within:border-eyebrow focus-within:ring-2 focus-within:ring-eyebrow/15"
      onSubmit={submit}
    >
      <textarea
        aria-label={t('chatbot.name')}
        placeholder={t('chatbot.placeholder')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={1000}
        disabled={disabled}
        className="max-h-[88px] min-h-[28px] w-full flex-1 resize-none border-0 bg-transparent py-1.5 text-[10px] leading-[1.5] text-ink outline-none placeholder:text-placeholder"
      />
      <button
        type="submit"
        aria-label={t('chatbot.send')}
        disabled={!value.trim() || disabled}
        className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[4px] border-0 bg-forest text-white transition duration-150 hover:enabled:bg-brand-green focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sage-ring disabled:cursor-not-allowed disabled:opacity-[0.43]"
      >
        <Send size={17} />
      </button>
    </form>
  )
}
