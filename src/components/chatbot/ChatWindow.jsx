import { useEffect, useRef } from 'react'
import { Bot, RotateCcw, Sprout, X } from 'lucide-react'
import ChatInput from './ChatInput.jsx'
import ChatMessage, { TypingIndicator } from './ChatMessage.jsx'
import ChatSuggestions from './ChatSuggestions.jsx'

export default function ChatWindow({ open, messages, typing, onClose, onClear, onSend }) {
  const conversationRef = useRef(null)

  useEffect(() => {
    if (open && conversationRef.current) {
      conversationRef.current.scrollTo({ top: conversationRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [open, messages, typing])

  return (
    <section
      className={`notu-chat-window ${open ? 'notu-chat-window-open' : ''}`}
      aria-label="Tonu AI chat"
      aria-hidden={!open}
      inert={!open}
    >
      <header className="notu-chat-header">
        <span className="notu-chat-logo"><Sprout size={21} /></span>
        <div className="notu-chat-title">
          <b>Tonu AI</b>
          <span>Your Notunayon Marketplace Assistant</span>
          <small><i /> Online · Demo assistant</small>
        </div>
        <div className="notu-chat-header-actions">
          <button type="button" onClick={onClear} aria-label="Clear conversation" title="Clear conversation"><RotateCcw size={16} /></button>
          <button type="button" onClick={onClose} aria-label="Close chat" title="Close chat"><X size={18} /></button>
        </div>
      </header>

      <div className="notu-chat-demo-note"><Bot size={14} /> Responses are predefined demonstrations. No AI service is connected.</div>

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
        <span>Enter to send <i>·</i> Shift + Enter for a new line</span>
      </footer>
    </section>
  )
}
