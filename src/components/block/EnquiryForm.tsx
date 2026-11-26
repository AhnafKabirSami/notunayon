import { useState } from 'react'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import Button from '../ui/Button.tsx'
import { Field, SelectField } from '../ui/FormFields.tsx'
import SuccessState from '../ui/SuccessState.tsx'

export default function EnquiryForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex flex-col gap-[13px] rounded-[4px] border border-line bg-surface-subtle p-[25px] max-md:p-[17px]">
        <SuccessState
          title="Sourcing request submitted."
          text="Thank you. Our sourcing desk will review your requirements and follow up."
          close={() => setSent(false)}
        />
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-[13px] rounded-[4px] border border-line bg-surface-subtle p-[25px] max-md:p-[17px]"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="mb-px flex items-center gap-2.5">
        <span className="grid h-[37px] w-[37px] place-items-center rounded-[4px] bg-surface-tint text-eyebrow">
          <BriefcaseBusiness size={19} />
        </span>
        <div>
          <b className="block text-[12px] text-ink">Business sourcing enquiry</b>
          <small className="mt-1 block text-[10px] text-subtle">
            Tell us what your team needs
          </small>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Business name" required />
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" required />
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
        <Field label="Delivery location" name="location" placeholder="District or area" required />
        <Field label="Material needed" name="material" placeholder="e.g. rice husk" required />
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
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
      <Button type="submit" className="w-full">
        Request sourcing support <ArrowRight size={16} />
      </Button>
      <small className="-mt-1 text-[9px] leading-[1.5] text-subtle">
        Our team typically responds within 1–2 business days.
      </small>
    </form>
  )
}
