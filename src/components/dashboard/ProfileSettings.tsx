import { useState } from 'react'
import { Check } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import type { DemoUser, UserRole } from '../../types/index.ts'
import Button from '../ui/Button.tsx'
import { Field } from '../ui/FormFields.tsx'
import InlineNotice from '../ui/InlineNotice.tsx'
import DashPageHeader from './DashPageHeader.tsx'

export default function ProfileSettings({ type }: { type: UserRole }) {
  const { user, setUser } = useApp()
  const [saved, setSaved] = useState(false)
  const account: DemoUser = user || { name: 'Marketplace User', type }

  return (
    <>
      <DashPageHeader
        eyebrow={`${type} workspace`}
        title="Profile settings"
        text="Keep your marketplace account details up to date."
      />
      {saved ? <InlineNotice text="Profile updated successfully." /> : null}
      <form
        className="flex max-w-[850px] min-w-0 flex-col gap-[13px] rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const next: DemoUser = {
            ...account,
            name: data.get('name')?.toString() || account.name,
            type,
          }
          localStorage.setItem('notunayon-demo-user', JSON.stringify(next))
          setUser(next)
          setSaved(true)
        }}
      >
        <div className="mb-[15px] flex items-start justify-between gap-2.5">
          <div>
            <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
              Basic information
            </h2>
            <p className="m-0 text-[9px] leading-[1.7] text-muted">Account profile</p>
          </div>
          <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface-tint px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-chip-text">
            ACTIVE
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
          <Field label="Full name" name="name" defaultValue={account.name} required />
          <Field label="Business name" name="business" placeholder="Business or farm name" />
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <Field label="Phone" name="phone" placeholder="+880 1XXX-XXXXXX" />
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
          <Field label="Location" name="location" placeholder="District, Bangladesh" />
          <Field
            label={type === 'seller' ? 'Business type' : 'Industry'}
            name="businessType"
            placeholder="Choose your business type"
          />
        </div>
        <Button type="submit" className="self-start">
          <Check size={16} /> Save changes
        </Button>
      </form>
    </>
  )
}
