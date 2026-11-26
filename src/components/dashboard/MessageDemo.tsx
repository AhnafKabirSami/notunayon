import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Send } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import DashPageHeader from './DashPageHeader.tsx'

const contacts: Array<[string, string, string]> = [
  ['Mrittika Organics', 'Rice Husk', '10:24 AM'],
  ['GreenFlame Bioenergy', 'Rice Straw', 'Yesterday'],
  ['Shobuj Krishi Inputs', 'Cattle Manure', '18 Nov'],
]

export default function MessageDemo() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [messages, setMessages] = useState<string[]>([
    'Hello, I’m interested in discussing your material listing.',
    'Thanks for reaching out. We can discuss collection timing and available quantities.',
  ])
  const [value, setValue] = useState('')

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!value.trim()) return
    setMessages([...messages, value.trim()])
    setValue('')
  }

  return (
    <>
      <DashPageHeader
        eyebrow="Workspace messages"
        title="Conversations"
        text="A small interactive messaging demo. Messages stay in this page state only."
      />
      <div className="message-app">
        <aside className="message-contacts">
          <div className="message-contacts-head">
            <h3>Messages</h3>
            <button className="icon-button" title="New message" onClick={() => setActive(0)}>
              <Plus size={16} />
            </button>
          </div>
          {contacts.map(([name, material, time], index) => (
            <button
              className={`contact-row ${active === index ? 'active' : ''}`}
              key={name}
              onClick={() => setActive(index)}
            >
              <span className="contact-avatar">{name.slice(0, 1)}</span>
              <span>
                <b>{name}</b>
                <small>{marketplaceLabel(t, material, { fixed: true })}</small>
              </span>
              <time>{time}</time>
            </button>
          ))}
        </aside>
        <section className="message-thread">
          <div className="thread-head">
            <span className="contact-avatar">{contacts[active][0].slice(0, 1)}</span>
            <div>
              <b>{contacts[active][0]}</b>
              <small>
                Regarding {marketplaceLabel(t, contacts[active][1], { fixed: true })} · demo contact
              </small>
            </div>
            <span className="online-demo">
              <i /> Demo thread
            </span>
          </div>
          <div className="message-history">
            <span className="date-separator">Today · demonstration thread</span>
            {messages.map((message, index) => (
              <div
                className={`message-bubble ${index % 2 ? 'mine' : ''}`}
                key={`${message}-${index}`}
              >
                <p>{message}</p>
                <small>
                  {index % 2 ? 'You' : contacts[active][0]} · {index ? '10:24 AM' : '10:20 AM'}
                </small>
              </div>
            ))}
          </div>
          <form className="message-compose" onSubmit={send}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write a demo message…"
              aria-label="Write a demo message"
            />
            <button className="button button-solid" type="submit">
              <Send size={16} /> Send
            </button>
          </form>
        </section>
      </div>
    </>
  )
}
