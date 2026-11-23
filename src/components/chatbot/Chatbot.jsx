import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X } from 'lucide-react'
import { listingsSeed } from '../../data/mockData.js'
import { getDemoResponse } from './chatbotResponses.js'
import { createConversationContext } from './conversationContext.js'
import ChatWindow from './ChatWindow.jsx'
import './chatbot.css'

const STORAGE_KEY = 'tonu-ai-conversation'
const CONTEXT_STORAGE_KEY = 'tonu-ai-context'
const WELCOME_TEXT = "Hello! I'm Tonu AI, your Notunayon assistant. I can help you discover agricultural materials, find suppliers, understand by-products, and navigate our marketplace. How can I help you today?"

function createWelcomeMessage(welcomeText = WELCOME_TEXT) {
  return { id: 'tonu-welcome', role: 'assistant', text: welcomeText, timestamp: new Date().toISOString() }
}

function readConversation(welcomeText) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved) && saved.length > 0) return saved
  } catch {
    // An unavailable or malformed session record starts a fresh local conversation.
  }
  return [createWelcomeMessage(welcomeText)]
}

export default function Chatbot({ listings = listingsSeed }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => readConversation(t('chatbot.welcome')))
  const [typing, setTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState(() => {
    try {
      return { ...createConversationContext(), language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en', ...(JSON.parse(sessionStorage.getItem(CONTEXT_STORAGE_KEY) || '{}')) }
    } catch {
      return createConversationContext()
    }
  })
  const timerRef = useRef(null)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // The conversation remains available in component state if storage is unavailable.
    }
  }, [messages])

  useEffect(() => {
    try {
      sessionStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(conversationContext))
    } catch {
      // Context remains available in component state if storage is unavailable.
    }
  }, [conversationContext])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const clearConversation = useCallback(() => {
    window.clearTimeout(timerRef.current)
    timerRef.current = null
    setTyping(false)
    setMessages([createWelcomeMessage(t('chatbot.welcome'))])
    setConversationContext({ ...createConversationContext(), language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en' })
  }, [i18n.resolvedLanguage, t])

  const sendMessage = useCallback((text) => {
    const content = text.trim()
    if (!content || timerRef.current) return
    const userMessage = { id: `tonu-user-${Date.now()}`, role: 'user', text: content, timestamp: new Date().toISOString() }
    setMessages((current) => [...current, userMessage])
    setTyping(true)
    timerRef.current = window.setTimeout(() => {
      const selectedContext = { ...conversationContext, language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en' }
      const response = getDemoResponse(content, listings, selectedContext)
      setConversationContext(response.context || conversationContext)
      const assistantMessage = {
        id: `tonu-assistant-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        links: response.links,
        timestamp: new Date().toISOString(),
      }
      setMessages((current) => [...current, assistantMessage])
      setTyping(false)
      timerRef.current = null
    }, 850)
  }, [listings, conversationContext, i18n.resolvedLanguage])

  return (
    <div className="notu-chatbot">
      <ChatWindow
        open={open}
        messages={messages}
        typing={typing}
        onClose={() => setOpen(false)}
        onClear={clearConversation}
        onSend={sendMessage}
      />
      <button
        className={`notu-chat-launcher ${open ? 'notu-chat-launcher-open' : ''}`}
        type="button"
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={23} /> : <MessageCircle size={23} />}
        {!open && <span>{i18n.resolvedLanguage === 'bn' ? 'তনু AI-এর কাছে জিজ্ঞাসা করুন' : 'Ask Tonu AI'}</span>}
      </button>
    </div>
  )
}
