import { useTranslation } from 'react-i18next'
import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react'

export default function ChatSuggestions({ onSelect }: { onSelect: (question: string) => void }) {
  const { t } = useTranslation()
  const chatSuggestions = [t('chatbot.s1'), t('chatbot.s2'), t('chatbot.s3'), t('chatbot.s4')]

  return (
    <div
      className="mt-[11px] ml-[35px] grid gap-1.5 animate-[notu-message-in_0.24s_ease_both] motion-reduce:animate-none"
      aria-label={t('chatbot.suggested')}
    >
      <div className="mb-px flex items-center gap-1.5 text-[9px] font-[650] text-chat-meta">
        <MessageCircleQuestion size={14} className="text-eyebrow" /> {t('chatbot.suggested')}
      </div>
      {chatSuggestions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="flex min-h-[35px] items-center justify-between gap-2 rounded-[3px] border border-chat-bubble-border bg-chat-bubble px-[9px] py-[7px] text-left text-[9px] text-ink transition duration-150 hover:border-eyebrow hover:bg-surface-tint-soft focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sage-ring"
        >
          <span>{question}</span>
          <ArrowUpRight size={14} className="shrink-0 text-subtle" />
        </button>
      ))}
    </div>
  )
}
