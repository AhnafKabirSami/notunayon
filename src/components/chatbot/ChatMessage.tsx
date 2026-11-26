import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bot, Sprout, UserRound } from 'lucide-react'
import type { ChatMessageItem } from '../../types/index.ts'

export default function ChatMessage({ message }: { message: ChatMessageItem }) {
  const { t, i18n } = useTranslation()
  const isAssistant = message.role === 'assistant'
  const time = new Intl.DateTimeFormat(i18n.resolvedLanguage === 'bn' ? 'bn-BD' : 'en-BD', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(message.timestamp))

  return (
    <article
      className={`flex items-start gap-2 animate-[notu-message-in_0.2s_ease_both] motion-reduce:animate-none ${
        isAssistant ? '' : 'flex-row-reverse'
      }`}
    >
      <span
        className={`grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full ${
          isAssistant ? 'bg-surface-tint text-eyebrow' : 'bg-surface-alt text-muted'
        }`}
        aria-hidden="true"
      >
        {isAssistant ? <Sprout size={16} /> : <UserRound size={15} />}
      </span>
      <div
        className={`flex max-w-[86%] flex-col gap-[5px] ${
          isAssistant ? 'items-start' : 'items-end'
        }`}
      >
        <div className="flex items-baseline gap-[7px] px-0.5">
          <b className="text-[9px] font-bold text-chat-meta">
            {isAssistant ? t('chatbot.name') : i18n.resolvedLanguage === 'bn' ? 'আপনি' : 'You'}
          </b>
          <time dateTime={message.timestamp} className="text-[8px] text-subtle">
            {time}
          </time>
        </div>
        <div
          className={`[overflow-wrap:anywhere] border px-[11px] py-2.5 text-[10px] leading-[1.65] whitespace-pre-wrap ${
            isAssistant
              ? 'rounded-[2px_8px_8px_8px] border-chat-bubble-border bg-chat-bubble text-ink'
              : 'rounded-[8px_2px_8px_8px] border-chat-user-bg bg-chat-user-bg text-chat-user-text'
          }`}
        >
          {message.text}
          {message.links && message.links.length > 0 && (
            <div className="mt-[9px] grid gap-1.5">
              {message.links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  to={link.href}
                  className="flex min-h-[32px] items-center justify-between gap-2 rounded-[3px] border border-line bg-surface px-2 py-[7px] text-[9px] leading-[1.4] font-[650] text-link no-underline after:shrink-0 after:text-subtle after:content-['↗'] hover:border-eyebrow hover:bg-surface-tint-soft"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function TypingIndicator() {
  const { t } = useTranslation()
  return (
    <div
      className="flex items-start gap-2 animate-[notu-message-in_0.2s_ease_both] motion-reduce:animate-none"
      role="status"
      aria-label={t('chatbot.typing')}
    >
      <span
        className="grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full bg-surface-tint text-eyebrow"
        aria-hidden="true"
      >
        <Bot size={16} />
      </span>
      <div className="flex h-[33px] items-center gap-1 rounded-[2px_8px_8px_8px] border border-chat-bubble-border bg-chat-bubble px-3">
        <i className="h-[5px] w-[5px] animate-[notu-typing_1s_ease-in-out_infinite] rounded-full bg-eyebrow motion-reduce:animate-none" />
        <i className="h-[5px] w-[5px] animate-[notu-typing_1s_ease-in-out_infinite_0.14s] rounded-full bg-eyebrow motion-reduce:animate-none" />
        <i className="h-[5px] w-[5px] animate-[notu-typing_1s_ease-in-out_infinite_0.28s] rounded-full bg-eyebrow motion-reduce:animate-none" />
      </div>
    </div>
  )
}
