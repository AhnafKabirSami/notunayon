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
      className="flex min-h-[44px] items-center gap-1.5 rounded-[5px] border border-[#dfe6dd] bg-white py-1 pr-[5px] pl-2.5 transition duration-150 focus-within:border-[#8aa58b] focus-within:ring-2 focus-within:ring-[#567f5c]/10 dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#edf4ef]"
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
        className="max-h-[88px] min-h-[28px] w-full flex-1 resize-none border-0 bg-transparent py-1.5 text-[10px] leading-[1.5] text-[#415047] outline-none placeholder:text-[#929d93] dark:text-[#edf4ef] dark:placeholder:text-[#93a098]"
      />
      <button
        type="submit"
        aria-label={t('chatbot.send')}
        disabled={!value.trim() || disabled}
        className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[4px] border-0 bg-[#173b2d] text-white transition duration-150 hover:enabled:bg-[#2e684a] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#b6d2a8] disabled:cursor-not-allowed disabled:opacity-[0.43]"
      >
        <Send size={17} />
      </button>
    </form>
  )
}
