import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Send } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import Button from '../ui/Button.tsx'
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
        text="Message buyers and sellers directly about listings."
      />
      <div className="grid h-[min(570px,calc(100vh-230px))] min-h-[390px] grid-cols-[245px_1fr] overflow-hidden border border-line bg-surface max-md:grid-cols-1">
        <aside className="border-r border-line max-md:flex max-md:overflow-x-auto max-md:border-r-0 max-md:border-b">
          <div className="flex items-center justify-between border-b border-line-soft p-3 max-md:hidden">
            <h3 className="m-0 text-[12px] font-semibold tracking-[-0.03em] text-ink">Messages</h3>
            <button
              className="inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint"
              title="New message"
              onClick={() => setActive(0)}
            >
              <Plus size={16} />
            </button>
          </div>
          {contacts.map(([name, material, time], index) => (
            <button
              className={`grid w-full grid-cols-[31px_1fr_auto] items-center gap-[7px] border-0 border-b border-line-soft p-[11px] text-left max-md:w-auto max-md:min-w-[145px] max-md:grid-cols-[28px_1fr] max-md:border-r ${
                active === index ? 'bg-surface-tint' : 'bg-surface hover:bg-surface-tint-soft'
              }`}
              key={name}
              onClick={() => setActive(index)}
            >
              <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-surface-tint text-[10px] font-bold text-eyebrow">
                {name.slice(0, 1)}
              </span>
              <span>
                <b className="block text-[9px] text-ink-soft">{name}</b>
                <small className="mt-[3px] block text-[8px] text-muted">
                  {marketplaceLabel(t, material, { fixed: true })}
                </small>
              </span>
              <time className="text-[7px] text-subtle max-md:hidden">{time}</time>
            </button>
          ))}
        </aside>
        <section className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b border-line-soft px-[13px] py-2.5 max-md:px-2.5 max-md:py-[7px]">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-surface-tint text-[10px] font-bold text-eyebrow">
              {contacts[active][0].slice(0, 1)}
            </span>
            <div>
              <b className="block text-[9px] text-ink-soft">{contacts[active][0]}</b>
              <small className="mt-[3px] block text-[8px] text-muted">
                Regarding {marketplaceLabel(t, contacts[active][1], { fixed: true })}
              </small>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] text-[8px] text-muted">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-sage-dot" /> Active
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[11px] overflow-y-auto bg-canvas p-[17px]">
            <span className="self-center bg-surface-tint px-[7px] py-[5px] text-[8px] text-muted">
              Today · Active thread
            </span>
            {messages.map((message, index) => (
              <div
                className={`max-w-[74%] px-[11px] py-[9px] ${
                  index % 2
                    ? 'self-end rounded-[7px_2px_7px_7px] bg-chat-msg-mine'
                    : 'self-start rounded-[2px_7px_7px_7px] bg-chat-msg-bubble'
                }`}
                key={`${message}-${index}`}
              >
                <p className="m-0 text-[9px] leading-[1.7] text-ink-soft">{message}</p>
                <small className="mt-[5px] block text-[7px] text-subtle">
                  {index % 2 ? 'You' : contacts[active][0]} · {index ? '10:24 AM' : '10:20 AM'}
                </small>
              </div>
            ))}
          </div>
          <form
            className="flex gap-[7px] border-t border-line-soft p-2.5"
            onSubmit={send}
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write a message…"
              aria-label="Write a message"
              className="h-[38px] min-w-0 flex-1 border border-input-border bg-input px-2.5 text-[9px] text-ink outline-none placeholder:text-placeholder"
            />
            <Button type="submit" className="min-h-[37px] max-md:px-2.5">
              <Send size={16} /> Send
            </Button>
          </form>
        </section>
      </div>
    </>
  )
}
