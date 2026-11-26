import { useTranslation } from 'react-i18next'
import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react'

export default function ChatSuggestions({ onSelect }: { onSelect: (question: string) => void }) {
  const { t } = useTranslation()
  const chatSuggestions = [t('chatbot.s1'), t('chatbot.s2'), t('chatbot.s3'), t('chatbot.s4')]

  return (
    <div className="notu-suggestions" aria-label={t('chatbot.suggested')}>
      <div className="notu-suggestions-heading">
        <MessageCircleQuestion size={14} /> {t('chatbot.suggested')}
      </div>
      {chatSuggestions.map((question) => (
        <button key={question} type="button" onClick={() => onSelect(question)}>
          <span>{question}</span>
          <ArrowUpRight size={14} />
        </button>
      ))}
    </div>
  )
}
