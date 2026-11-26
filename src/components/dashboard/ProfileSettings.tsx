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
  const account: DemoUser = user || { name: 'Demo User', type }

  return (
    <>
      <DashPageHeader
        eyebrow={`${type} workspace`}
        title="Profile settings"
        text="Update a local demonstration profile. No data leaves this browser."
      />
      {saved ? <InlineNotice text="Profile updated in this local demo." /> : null}
      <form
        className="dash-panel form-stack profile-form"
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
        <div className="panel-title">
          <div>
            <h2>Basic information</h2>
            <p>Demo user profile</p>
          </div>
          <span className="demo-tag">LOCAL</span>
        </div>
        <div className="form-row">
          <Field label="Full name" name="name" defaultValue={account.name} required />
          <Field label="Business name" name="business" placeholder="Business or farm name" />
        </div>
        <div className="form-row">
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <Field label="Phone" name="phone" placeholder="+880 1XXX-XXXXXX" />
        </div>
        <div className="form-row">
          <Field label="Location" name="location" placeholder="District, Bangladesh" />
          <Field
            label={type === 'seller' ? 'Business type' : 'Industry'}
            name="businessType"
            placeholder="Choose your business type"
          />
        </div>
        <Button type="submit">
          <Check size={16} /> Save local changes
        </Button>
      </form>
    </>
  )
}
