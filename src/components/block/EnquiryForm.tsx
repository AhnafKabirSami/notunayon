import { useState } from 'react'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import Button from '../ui/Button.tsx'
import { Field, SelectField } from '../ui/FormFields.tsx'
import SuccessState from '../ui/SuccessState.tsx'

export default function EnquiryForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="enquiry-card">
        <SuccessState
          title="Sourcing request saved."
          text="Your request is now a local frontend demonstration. No service is contacted."
          close={() => setSent(false)}
        />
      </div>
    )
  }

  return (
    <form
      className="enquiry-card form-stack"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="enquiry-head">
        <span>
          <BriefcaseBusiness size={19} />
        </span>
        <div>
          <b>Business sourcing enquiry</b>
          <small>Tell us what your team needs</small>
        </div>
      </div>
      <div className="form-row">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Business name" required />
      </div>
      <div className="form-row">
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" required />
      </div>
      <div className="form-row">
        <Field label="Delivery location" name="location" placeholder="District or area" required />
        <Field label="Material needed" name="material" placeholder="e.g. rice husk" required />
      </div>
      <div className="form-row">
        <Field label="Monthly quantity" name="quantity" placeholder="e.g. 10 MT" required />
        <SelectField
          label="Service required"
          name="service"
          options={['Supplier discovery', 'Material sourcing', 'Pickup coordination', 'Other']}
        />
      </div>
      <Field
        label="Additional requirements"
        name="notes"
        as="textarea"
        placeholder="Condition, schedule, or other details"
      />
      <Button type="submit">
        Request sourcing support <ArrowRight size={16} />
      </Button>
      <small className="form-help">Demo form · your information is not sent to a server.</small>
    </form>
  )
}
