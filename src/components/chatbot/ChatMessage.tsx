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
    <article className={`notu-message notu-message-${message.role}`}>
      <span className="notu-message-avatar" aria-hidden="true">
        {isAssistant ? <Sprout size={16} /> : <UserRound size={15} />}
      </span>
      <div className="notu-message-content">
        <div className="notu-message-meta">
          <b>
            {isAssistant ? t('chatbot.name') : i18n.resolvedLanguage === 'bn' ? 'আপনি' : 'You'}
          </b>
          <time dateTime={message.timestamp}>{time}</time>
        </div>
        <div className="notu-message-bubble">
          {message.text}
          {message.links && message.links.length > 0 && (
            <div className="notu-message-links">
              {message.links.map((link) => (
                <Link key={`${link.href}-${link.label}`} to={link.href}>
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
      className="notu-message notu-message-assistant"
      role="status"
      aria-label={t('chatbot.typing')}
    >
      <span className="notu-message-avatar" aria-hidden="true">
        <Bot size={16} />
      </span>
      <div className="notu-typing-bubble">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}
