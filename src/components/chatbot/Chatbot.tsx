import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X } from 'lucide-react'
import { listingsSeed } from '../../data/mockData.ts'
import type { ChatMessageItem, ConversationContext, Listing } from '../../types/index.ts'
import { getDemoResponse } from './chatbotResponses.ts'
import ChatWindow from './ChatWindow.tsx'
import { createConversationContext } from './conversationContext.ts'

const STORAGE_KEY = 'tonu-ai-conversation'
const CONTEXT_STORAGE_KEY = 'tonu-ai-context'
const WELCOME_TEXT =
  "Hello! I'm Tonu AI, your Notunayon assistant. I can help you discover agricultural materials, find suppliers, understand by-products, and navigate our marketplace. How can I help you today?"

function createWelcomeMessage(welcomeText = WELCOME_TEXT): ChatMessageItem {
  return {
    id: 'tonu-welcome',
    role: 'assistant',
    text: welcomeText,
    timestamp: new Date().toISOString(),
  }
}

function readConversation(welcomeText: string): ChatMessageItem[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null') as unknown
    if (Array.isArray(saved) && saved.length > 0) return saved as ChatMessageItem[]
  } catch {
    // An unavailable or malformed session record starts a fresh local conversation.
  }
  return [createWelcomeMessage(welcomeText)]
}

export default function Chatbot({ listings = listingsSeed }: { listings?: Listing[] }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageItem[]>(() =>
    readConversation(t('chatbot.welcome')),
  )
  const [typing, setTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<ConversationContext>(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem(CONTEXT_STORAGE_KEY) || '{}',
      ) as Partial<ConversationContext>
      return {
        ...createConversationContext(),
        language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en',
        ...saved,
      }
    } catch {
      return createConversationContext()
    }
  })
  const timerRef = useRef<number | null>(null)

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

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  const clearConversation = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
    setTyping(false)
    setMessages([createWelcomeMessage(t('chatbot.welcome'))])
    setConversationContext({
      ...createConversationContext(),
      language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en',
    })
  }, [i18n.resolvedLanguage, t])

  const sendMessage = useCallback(
    (text: string) => {
      const content = text.trim()
      if (!content || timerRef.current !== null) return
      const userMessage: ChatMessageItem = {
        id: `tonu-user-${Date.now()}`,
        role: 'user',
        text: content,
        timestamp: new Date().toISOString(),
      }
      setMessages((current) => [...current, userMessage])
      setTyping(true)
      timerRef.current = window.setTimeout(() => {
        const selectedContext: ConversationContext = {
          ...conversationContext,
          language: i18n.resolvedLanguage === 'bn' ? 'bn' : 'en',
        }
        const response = getDemoResponse(content, listings, selectedContext)
        setConversationContext(response.context || conversationContext)
        const assistantMessage: ChatMessageItem = {
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
    },
    [listings, conversationContext, i18n.resolvedLanguage],
  )

  return (
    <div className="fixed right-6 bottom-6 z-[80] font-sans text-[#252e28] max-[600px]:right-[15px] max-[600px]:bottom-[max(15px,env(safe-area-inset-bottom))]">
      <ChatWindow
        open={open}
        messages={messages}
        typing={typing}
        onClose={() => setOpen(false)}
        onClear={clearConversation}
        onSend={sendMessage}
      />
      <button
        className={`inline-flex items-center justify-center gap-2.5 border border-white/30 bg-[#173b2d] text-[13px] font-[680] text-white shadow-[0_8px_24px_rgba(20,54,36,0.26)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#24583d] hover:shadow-[0_11px_28px_rgba(20,54,36,0.3)] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#b6d2a8] motion-reduce:transition-none dark:bg-[#1b3024] ${
          open
            ? 'h-12 w-12 min-w-12 rounded-full p-0 max-[600px]:h-[46px] max-[600px]:w-[46px] max-[600px]:min-w-[46px]'
            : 'h-[58px] min-w-[62px] rounded-[30px] px-[17px] max-[600px]:h-[54px] max-[600px]:w-[54px] max-[600px]:min-w-[54px] max-[600px]:p-0'
        }`}
        type="button"
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={23} /> : <MessageCircle size={23} />}
        {!open && (
          <span className="max-[600px]:hidden">
            {i18n.resolvedLanguage === 'bn' ? 'তনু AI-এর কাছে জিজ্ঞাসা করুন' : 'Ask Tonu AI'}
          </span>
        )}
      </button>
    </div>
  )
}
