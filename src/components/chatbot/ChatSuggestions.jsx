import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react'

const chatSuggestions = [
  'Find rice husk near Rajshahi',
  'How can I sell cattle manure?',
  'What is poultry litter used for?',
  'How does Notunayon work?',
]

export default function ChatSuggestions({ onSelect }) {
  return (
    <div className="notu-suggestions" aria-label="Suggested questions">
      <div className="notu-suggestions-heading"><MessageCircleQuestion size={14} /> Suggested questions</div>
      {chatSuggestions.map((question) => (
        <button key={question} type="button" onClick={() => onSelect(question)}>
          <span>{question}</span><ArrowUpRight size={14} />
        </button>
      ))}
    </div>
  )
}
