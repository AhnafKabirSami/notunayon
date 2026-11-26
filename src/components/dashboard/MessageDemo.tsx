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
        text="A small interactive messaging demo. Messages stay in this page state only."
      />
      <div className="grid h-[min(570px,calc(100vh-230px))] min-h-[390px] grid-cols-[245px_1fr] overflow-hidden border border-[#e4e9e2] bg-white max-md:grid-cols-1 dark:border-[#34463a] dark:bg-[#1a261f]">
        <aside className="border-r border-[#e9ede7] max-md:flex max-md:overflow-x-auto max-md:border-r-0 max-md:border-b dark:border-[#34463a]">
          <div className="flex items-center justify-between border-b border-[#edf0ec] p-3 max-md:hidden dark:border-[#34463a]">
            <h3 className="m-0 text-[12px] font-semibold tracking-[-0.03em] text-[#252e28] dark:text-[#edf4ef]">
              Messages
            </h3>
            <button
              className="inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-[#536157] hover:bg-[#eef2ed] dark:text-[#b2beb5] dark:hover:bg-[#223128]"
              title="New message"
              onClick={() => setActive(0)}
            >
              <Plus size={16} />
            </button>
          </div>
          {contacts.map(([name, material, time], index) => (
            <button
              className={`grid w-full grid-cols-[31px_1fr_auto] items-center gap-[7px] border-0 border-b border-[#f0f2ef] p-[11px] text-left max-md:w-auto max-md:min-w-[145px] max-md:grid-cols-[28px_1fr] max-md:border-r dark:border-[#34463a] ${
                active === index
                  ? 'bg-[#f4f7f2] dark:bg-[#223128]'
                  : 'bg-white hover:bg-[#f4f7f2] dark:bg-[#1a261f] dark:hover:bg-[#223128]'
              }`}
              key={name}
              onClick={() => setActive(index)}
            >
              <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#e9f0e7] text-[10px] font-bold text-[#54755b] dark:bg-[#223128] dark:text-[#a6c5ab]">
                {name.slice(0, 1)}
              </span>
              <span>
                <b className="block text-[9px] text-[#4e5e52] dark:text-[#edf4ef]">{name}</b>
                <small className="mt-[3px] block text-[8px] text-[#919a92] dark:text-[#b2beb5]">
                  {marketplaceLabel(t, material, { fixed: true })}
                </small>
              </span>
              <time className="text-[7px] text-[#9aa29b] max-md:hidden">{time}</time>
            </button>
          ))}
        </aside>
        <section className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b border-[#edf0ec] px-[13px] py-2.5 max-md:px-2.5 max-md:py-[7px] dark:border-[#34463a]">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#e9f0e7] text-[10px] font-bold text-[#54755b] dark:bg-[#223128] dark:text-[#a6c5ab]">
              {contacts[active][0].slice(0, 1)}
            </span>
            <div>
              <b className="block text-[9px] text-[#4c5c50] dark:text-[#edf4ef]">
                {contacts[active][0]}
              </b>
              <small className="mt-[3px] block text-[8px] text-[#8e988f] dark:text-[#b2beb5]">
                Regarding {marketplaceLabel(t, contacts[active][1], { fixed: true })} · demo contact
              </small>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] text-[8px] text-[#728075] dark:text-[#b2beb5]">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-[#69a17a]" /> Demo thread
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[11px] overflow-y-auto bg-[#fbfcfa] p-[17px] dark:bg-[#111915]">
            <span className="self-center bg-[#f1f3ef] px-[7px] py-[5px] text-[8px] text-[#939b93] dark:bg-[#223128] dark:text-[#b2beb5]">
              Today · demonstration thread
            </span>
            {messages.map((message, index) => (
              <div
                className={`max-w-[74%] px-[11px] py-[9px] ${
                  index % 2
                    ? 'self-end rounded-[7px_2px_7px_7px] bg-[#eaf1f3] dark:bg-[#1a261f]'
                    : 'self-start rounded-[2px_7px_7px_7px] bg-[#edf2e9] dark:bg-[#1a261f]'
                }`}
                key={`${message}-${index}`}
              >
                <p className="m-0 text-[9px] leading-[1.7] text-[#546157] dark:text-[#edf4ef]">
                  {message}
                </p>
                <small className="mt-[5px] block text-[7px] text-[#8c978e] dark:text-[#b2beb5]">
                  {index % 2 ? 'You' : contacts[active][0]} · {index ? '10:24 AM' : '10:20 AM'}
                </small>
              </div>
            ))}
          </div>
          <form
            className="flex gap-[7px] border-t border-[#edf0ec] p-2.5 dark:border-[#34463a]"
            onSubmit={send}
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write a demo message…"
              aria-label="Write a demo message"
              className="h-[38px] min-w-0 flex-1 border border-[#e2e8e1] px-2.5 text-[9px] outline-none dark:border-[#405247] dark:bg-[#152019] dark:text-[#edf4ef]"
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
