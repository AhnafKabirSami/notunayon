import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/useApp.js'
import { categories } from '../../data/mockData.js'
import Button from '../ui/Button.jsx'
import { Field, SelectField } from '../ui/FormFields.jsx'
import SuccessState from '../ui/SuccessState.jsx'
import DashPageHeader from './DashPageHeader.jsx'

export default function RequirementForm() {
  const { requests, setRequests } = useApp()
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const material = data.get('material').toString().trim()
    const quantity = data.get('quantity').toString().trim()
    if (!material || !quantity) {
      setError('Add a material and quantity to continue.')
      return
    }
    setRequests([
      {
        id: `req-${Date.now()}`,
        material,
        category: data.get('category').toString(),
        quantity: `${quantity} ${data.get('unit')}`,
        location: data.get('location').toString(),
        budget: data.get('price').toString()
          ? `Up to ৳${data.get('price')} / kg`
          : 'Negotiable',
        buyer: 'Demo buyer company',
        date: 'Just now',
        deliveryDate: data.get('date')?.toString(),
        requirements: data.get('notes')?.toString(),
        condition: data.get('condition').toString() || 'Flexible',
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
        text="Describe what you’re looking for to create a local demo buyer request."
      />
      {done ? (
        <div className="dash-panel listing-success">
          <SuccessState
            title="Requirement posted."
            text="Your request is now listed in the local buyer requests demo."
            close={() => setDone(false)}
          />
          <Link className="button button-outline-dark" to="/requests">
            View buyer requests
          </Link>
        </div>
      ) : (
        <form className="dash-panel form-stack requirement-form" onSubmit={submit}>
          <div className="form-row">
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
          <div className="form-row">
            <Field
              label="Quantity *"
              name="quantity"
              type="number"
              min="0.1"
              step="0.1"
              placeholder="e.g. 5"
              required
            />
            <SelectField label="Unit" name="unit" options={['MT', 'tonnes', 'kg']} />
          </div>
          <div className="form-row">
            <Field
              label="Target price (৳ / kg)"
              name="price"
              type="number"
              min="1"
              placeholder="Optional"
            />
            <Field
              label="Delivery location"
              name="location"
              placeholder="District, Bangladesh"
              required
            />
          </div>
          <div className="form-row">
            <Field label="Required condition" name="condition" placeholder="e.g. dry, sorted" />
            <Field label="Delivery date" name="date" type="date" />
          </div>
          <Field
            label="Additional requirements"
            name="notes"
            as="textarea"
            placeholder="Share schedule, collection, or other details"
          />
          <p className="form-error">{error}</p>
          <Button type="submit">
            Post demo requirement <ArrowRight size={16} />
          </Button>
          <p className="form-help">
            The request is stored in this page state only. No suppliers are contacted.
          </p>
        </form>
      )}
    </>
  )
}
