import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Bot, RotateCcw, Sprout, X } from 'lucide-react'
import type { ChatMessageItem } from '../../types/index.ts'
import ChatInput from './ChatInput.tsx'
import ChatMessage, { TypingIndicator } from './ChatMessage.tsx'
import ChatSuggestions from './ChatSuggestions.tsx'

interface ChatWindowProps {
  open: boolean
  messages: ChatMessageItem[]
  typing: boolean
  onClose: () => void
  onClear: () => void
  onSend: (text: string) => void
}

export default function ChatWindow({
  open,
  messages,
  typing,
  onClose,
  onClear,
  onSend,
}: ChatWindowProps) {
  const { t } = useTranslation()
  const conversationRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [open, messages, typing])

  return (
    <section
      className={`absolute right-0 bottom-[72px] flex h-[min(610px,calc(100dvh-112px))] min-h-[390px] w-[min(390px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[9px] border border-[#e1e9e1] bg-white shadow-[0_20px_58px_rgba(17,42,27,0.24)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none max-[600px]:fixed max-[600px]:right-2.5 max-[600px]:bottom-[calc(77px+env(safe-area-inset-bottom))] max-[600px]:h-[min(620px,calc(100dvh-102px-env(safe-area-inset-bottom)))] max-[600px]:min-h-[340px] max-[600px]:w-[calc(100vw-20px)] max-[600px]:rounded-[8px] dark:border-[#34463a] dark:bg-[#19251e] ${
        open
          ? 'visible pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'invisible pointer-events-none translate-y-[15px] scale-[0.98] opacity-0'
      }`}
      aria-label={t('chatbot.name')}
      aria-hidden={!open}
      inert={!open}
    >
      <header className="flex min-h-[76px] items-center gap-[11px] bg-[#173b2d] px-[13px] py-3 text-white dark:bg-[#1b3024]">
        <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[12px_12px_12px_4px] bg-[#e0ead8] text-[#264b32]">
          <Sprout size={21} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <b className="text-[15px] tracking-[-0.02em] text-white">{t('chatbot.name')}</b>
          <span className="truncate text-[9px] text-[#f2f8f1]/[0.78]">{t('chatbot.subtitle')}</span>
          <small className="inline-flex items-center gap-[5px] text-[9px] text-[#d6e5d4]">
            <i className="h-1.5 w-1.5 rounded-full bg-[#8eb889] shadow-[0_0_0_3px_rgba(151,192,140,0.13)]" />{' '}
            {t('chatbot.online')}
          </small>
        </div>
        <div className="flex items-center gap-[3px]">
          <button
            type="button"
            onClick={onClear}
            aria-label={t('chatbot.clear')}
            title={t('chatbot.clear')}
            className="grid h-[33px] w-[33px] place-items-center rounded-[4px] border-0 bg-transparent text-white/[0.86] hover:bg-white/[0.12] hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#b6d2a8]"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            title={t('common.close')}
            className="grid h-[33px] w-[33px] place-items-center rounded-[4px] border-0 bg-transparent text-white/[0.86] hover:bg-white/[0.12] hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#b6d2a8]"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <div className="flex min-h-[34px] items-center gap-[7px] border-b border-[#e7eee4] bg-[#f2f6ef] px-[13px] text-[9px] text-[#718071] dark:border-[#34463a] dark:bg-[#223128] dark:text-[#b7c3ba]">
        <Bot size={14} className="shrink-0 text-[#67846a]" /> {t('chatbot.demoNote')}
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain bg-white px-[13px] pt-[17px] pb-[15px] [scrollbar-color:#cbd9cb_transparent] [scrollbar-width:thin] motion-reduce:scroll-auto dark:bg-[#19251e]"
        ref={conversationRef}
        aria-live="polite"
      >
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            {message.id === messages[0]?.id &&
              message.role === 'assistant' &&
              messages.length === 1 && <ChatSuggestions onSelect={onSend} />}
          </div>
        ))}
        {typing && <TypingIndicator />}
      </div>

      <footer className="border-t border-[#edf0ec] bg-white px-3 pt-2.5 pb-[9px] dark:border-[#34463a] dark:bg-[#19251e]">
        <ChatInput disabled={typing} onSend={onSend} />
        <span className="mt-1.5 block text-center text-[8px] text-[#9aa39a] dark:text-[#c6d2c9] [&_i]:px-0.5 [&_i]:not-italic">
          {t('chatbot.enterHint')}
        </span>
      </footer>
    </section>
  )
}
