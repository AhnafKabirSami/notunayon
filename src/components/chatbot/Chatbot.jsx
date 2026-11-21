import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { listingsSeed } from '../../data/mockData.js'
import { getDemoResponse } from './chatbotResponses.js'
import { createConversationContext } from './conversationContext.js'
import ChatWindow from './ChatWindow.jsx'
import './chatbot.css'

const STORAGE_KEY = 'tonu-ai-conversation'
const CONTEXT_STORAGE_KEY = 'tonu-ai-context'
const WELCOME_TEXT = "Hello! I'm Tonu AI, your Notunayon assistant. I can help you discover agricultural materials, find suppliers, understand by-products, and navigate our marketplace. How can I help you today?"

function createWelcomeMessage() {
  return { id: 'tonu-welcome', role: 'assistant', text: WELCOME_TEXT, timestamp: new Date().toISOString() }
}

function readConversation() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved) && saved.length > 0) return saved
  } catch {
    // An unavailable or malformed session record starts a fresh local conversation.
  }
  return [createWelcomeMessage()]
}

export default function Chatbot({ listings = listingsSeed }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(readConversation)
  const [typing, setTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState(() => {
    try {
      return { ...createConversationContext(), ...(JSON.parse(sessionStorage.getItem(CONTEXT_STORAGE_KEY) || '{}')) }
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
    setMessages([createWelcomeMessage()])
    setConversationContext(createConversationContext())
  }, [])

  const sendMessage = useCallback((text) => {
    const content = text.trim()
    if (!content || timerRef.current) return
    const userMessage = { id: `tonu-user-${Date.now()}`, role: 'user', text: content, timestamp: new Date().toISOString() }
    setMessages((current) => [...current, userMessage])
    setTyping(true)
    timerRef.current = window.setTimeout(() => {
      const response = getDemoResponse(content, listings, conversationContext)
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
  }, [listings, conversationContext])

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
        aria-label={open ? 'Close Tonu AI chat' : 'Open Tonu AI chat'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={23} /> : <MessageCircle size={23} />}
        {!open && <span>Ask Tonu AI</span>}
      </button>
    </div>
  )
}
