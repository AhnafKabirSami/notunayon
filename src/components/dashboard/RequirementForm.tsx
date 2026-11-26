import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { categories } from '../../data/mockData.ts'
import Button from '../ui/Button.tsx'
import { buttonClasses } from '../ui/buttonStyles.ts'
import { Field, SelectField } from '../ui/FormFields.tsx'
import SuccessState from '../ui/SuccessState.tsx'
import DashPageHeader from './DashPageHeader.tsx'

export default function RequirementForm() {
  const { user, requests, setRequests } = useApp()
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const material = data.get('material')?.toString().trim() || ''
    const quantity = data.get('quantity')?.toString().trim() || ''
    if (!material || !quantity) {
      setError('Add a material and quantity to continue.')
      return
    }
    const price = data.get('price')?.toString() || ''
    setRequests([
      {
        id: `req-${Date.now()}`,
        material,
        category: data.get('category')?.toString() || categories[0],
        quantity: `${quantity} ${data.get('unit')?.toString() || 'MT'}`,
        location: data.get('location')?.toString() || '',
        budget: price ? `Up to ৳${price} / kg` : 'Negotiable',
        buyer: user?.name || 'Registered Buyer',
        date: 'Just now',
        deliveryDate: data.get('date')?.toString(),
        requirements: data.get('notes')?.toString(),
        condition: data.get('condition')?.toString() || 'Flexible',
      },
      ...requests,
    ])
    setDone(true)
  }

  return (
    <>
      <DashPageHeader
        eyebrow="Buyer workspace"
        title="Post a sourcing requirement"
        text="Describe what you’re looking for so matching sellers can respond."
      />
      {done ? (
        <div className="min-w-0 max-w-[700px] rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
          <SuccessState
            className="px-2.5 pt-[25px] pb-[15px]"
            title="Requirement posted."
            text="Your request is now listed in the buyer requests directory."
            close={() => setDone(false)}
          />
          <Link
            className={buttonClasses({ variant: 'outline-dark', className: 'mx-auto mb-3 flex w-fit' })}
            to="/requests"
          >
            View buyer requests
          </Link>
        </div>
      ) : (
        <form
          className="flex max-w-[850px] min-w-0 flex-col gap-[13px] rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]"
          onSubmit={submit}
        >
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field
              label="Material required *"
              name="material"
              placeholder="e.g. rice husk"
              required
            />
            <SelectField
              label="Material category"
              name="category"
              options={categories}
              translateCategories
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field
              label="Quantity *"
              name="quantity"
              type="number"
              min={0.1}
              step={0.1}
              placeholder="e.g. 5"
              required
            />
            <SelectField label="Unit" name="unit" options={['MT', 'tonnes', 'kg']} />
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field
              label="Target price (৳ / kg)"
              name="price"
              type="number"
              min={1}
              placeholder="Optional"
            />
            <Field
              label="Delivery location"
              name="location"
              placeholder="District, Bangladesh"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field label="Required condition" name="condition" placeholder="e.g. dry, sorted" />
            <Field label="Delivery date" name="date" type="date" />
          </div>
          <Field
            label="Additional requirements"
            name="notes"
            as="textarea"
            placeholder="Share schedule, collection, or other details"
          />
          <p className="-mt-1 min-h-0 text-[10px] text-danger">{error}</p>
          <Button type="submit" className="self-start">
            Post requirement <ArrowRight size={16} />
          </Button>
          <p className="text-[9px] leading-[1.5] text-subtle">
            Suppliers can view active requirements and contact your business directly.
          </p>
        </form>
      )}
    </>
  )
}
