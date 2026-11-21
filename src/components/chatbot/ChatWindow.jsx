import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Bot, RotateCcw, Sprout, X } from 'lucide-react'
import ChatInput from './ChatInput.jsx'
import ChatMessage, { TypingIndicator } from './ChatMessage.jsx'
import ChatSuggestions from './ChatSuggestions.jsx'

export default function ChatWindow({ open, messages, typing, onClose, onClear, onSend }) {
  const { t } = useTranslation()
  const conversationRef = useRef(null)

  useEffect(() => {
    if (open && conversationRef.current) {
      conversationRef.current.scrollTo({ top: conversationRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [open, messages, typing])

  return (
    <section
      className={`notu-chat-window ${open ? 'notu-chat-window-open' : ''}`}
      aria-label={t('chatbot.name')}
      aria-hidden={!open}
      inert={!open}
    >
      <header className="notu-chat-header">
        <span className="notu-chat-logo"><Sprout size={21} /></span>
        <div className="notu-chat-title">
          <b>{t('chatbot.name')}</b>
          <span>{t('chatbot.subtitle')}</span>
          <small><i /> {t('chatbot.online')}</small>
        </div>
        <div className="notu-chat-header-actions">
          <button type="button" onClick={onClear} aria-label={t('chatbot.clear')} title={t('chatbot.clear')}><RotateCcw size={16} /></button>
          <button type="button" onClick={onClose} aria-label={t('common.close')} title={t('common.close')}><X size={18} /></button>
        </div>
      </header>

      <div className="notu-chat-demo-note"><Bot size={14} /> {t('chatbot.demoNote')}</div>

      <div className="notu-chat-conversation" ref={conversationRef} aria-live="polite">
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            {message.id === messages[0]?.id && message.role === 'assistant' && messages.length === 1 && (
              <ChatSuggestions onSelect={onSend} />
            )}
          </div>
        ))}
        {typing && <TypingIndicator />}
      </div>

      <footer className="notu-chat-footer">
        <ChatInput disabled={typing} onSend={onSend} />
        <span>{t('chatbot.enterHint')}</span>
      </footer>
    </section>
  )
}
