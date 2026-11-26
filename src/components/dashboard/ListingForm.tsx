import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, CheckCircle2, ImagePlus, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { categories } from '../../data/mockData.ts'
import type { Listing } from '../../types/index.ts'
import { photo } from '../../utils/marketplace.ts'
import Button from '../ui/Button.tsx'
import { Field, SelectField } from '../ui/FormFields.tsx'
import SuccessState from '../ui/SuccessState.tsx'
import DashPageHeader from './DashPageHeader.tsx'

export default function ListingForm() {
  const { listings, setListings } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  const existing = listings.find((item) => item.id === id)
  const [preview, setPreview] = useState(existing?.image ? photo(existing.image, 500) : '')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formKey, setFormKey] = useState(0)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name')?.toString().trim() || ''
    const price = Number(data.get('price'))
    const quantity = Number(data.get('quantity'))
    if (!name || price <= 0 || quantity <= 0) {
      setError('Enter a material name, price, and positive quantity.')
      return
    }
    const record: Listing = {
      ...(existing || {}),
      id: existing?.id || `demo-${Date.now()}`,
      name,
      category: data.get('category')?.toString() || categories[0],
      price,
      unit: data.get('priceUnit')?.toString() || 'kg',
      quantity,
      quantityUnit: data.get('quantityUnit')?.toString() || 'MT',
      seller: data.get('business')?.toString() || 'Demo Farm Collective',
      location: data.get('location')?.toString() || '',
      condition: data.get('condition')?.toString() || 'Dry',
      availability: data.get('availability')?.toString() || 'Available now',
      frequency: data.get('frequency')?.toString() || 'One-time',
      minimum: Number(data.get('minimum')) || 1,
      description: data.get('description')?.toString() || '',
      image: existing?.image || 'photo-1464226184884-fa280b87c399',
      color: existing?.color || '#98764f',
      tags: ['Seller demo'],
    }
    setListings((rows) =>
      existing
        ? rows.map((item) => (item.id === existing.id ? record : item))
        : [record, ...rows],
    )
    setSuccess(true)
    setError('')
  }

  return (
    <>
      <DashPageHeader
        eyebrow="Seller workspace"
        title={existing ? 'Edit listing' : 'Create a listing'}
        text="Add clear details so potential buyers can understand your available supply."
      />
      <div className="grid grid-cols-[minmax(0,1fr)_255px] items-start gap-3.5 max-md:grid-cols-1">
        {success ? (
          <div className="min-w-0 max-w-[700px] rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
            <SuccessState
              className="px-2.5 pt-[25px] pb-[15px]"
              title={existing ? 'Listing updated.' : 'Your listing is live in the demo.'}
              text="The listing is now visible in the local marketplace and your seller workspace."
              close={() => navigate('/seller-dashboard/listings')}
            />
            <Button
              variant="outline-dark"
              className="mx-auto mb-3 flex w-fit"
              onClick={() => {
                setSuccess(false)
                setFormKey((key) => key + 1)
              }}
            >
              Create another listing
            </Button>
          </div>
        ) : (
          <form
            key={formKey}
            className="flex max-w-[850px] min-w-0 flex-col gap-[13px] rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]"
            onSubmit={submit}
          >
            <div className="mb-[5px] flex items-start justify-between gap-2.5">
              <div>
                <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
                  Material details
                </h2>
                <p className="m-0 text-[9px] leading-[1.7] text-muted">
                  Fields marked with * are required.
                </p>
              </div>
              <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface-warm px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-pending">
                MOCK LISTING
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <SelectField
                label="Material category *"
                name="category"
                options={categories}
                defaultValue={existing?.category}
                required
                translateCategories
              />
              <Field
                label="Material name *"
                name="name"
                placeholder="e.g. Rice husk"
                defaultValue={existing?.name}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <Field
                label="Farm / business name"
                name="business"
                placeholder="Your business name"
                defaultValue={existing?.seller}
              />
              <Field
                label="Description"
                name="description"
                placeholder="Describe the source and material details"
                defaultValue={existing?.description}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <Field
                label="Available quantity *"
                name="quantity"
                type="number"
                min={0.1}
                step={0.1}
                placeholder="e.g. 2"
                defaultValue={existing?.quantity}
                required
              />
              <SelectField
                label="Quantity unit"
                name="quantityUnit"
                options={['MT', 'tonnes', 'kg', 'bags']}
                defaultValue={existing?.quantityUnit}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <Field
                label="Listed price (৳) *"
                name="price"
                type="number"
                min={1}
                defaultValue={existing?.price}
                required
              />
              <SelectField
                label="Price unit"
                name="priceUnit"
                options={['kg', 'MT', 'bag']}
                defaultValue={existing?.unit || 'kg'}
              />
            </div>
            <label className="inline-flex items-center gap-1.5 text-[10px] text-muted">
              <input name="negotiable" type="checkbox" defaultChecked className="accent-eyebrow" />{' '}
              Price is negotiable
            </label>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <SelectField
                label="Condition"
                name="condition"
                options={[
                  'Dry',
                  'Sun-dried',
                  'Freshly collected',
                  'Composted',
                  'Baled, dry',
                  'Raw, sorted',
                  'Other',
                ]}
                defaultValue={existing?.condition}
              />
              <Field
                label="Location *"
                name="location"
                placeholder="District or upazila"
                defaultValue={existing?.location}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
              <SelectField
                label="Availability"
                name="availability"
                options={[
                  'Available now',
                  'Available this week',
                  'Harvest season',
                  'By arrangement',
                ]}
                defaultValue={existing?.availability || 'Available now'}
              />
              <SelectField
                label="Supply frequency"
                name="frequency"
                options={['One-time', 'Weekly', 'Monthly', 'Seasonal', 'By arrangement']}
                defaultValue={existing?.frequency || 'One-time'}
              />
            </div>
            <Field
              label="Minimum order quantity (kg)"
              name="minimum"
              type="number"
              min={1}
              defaultValue={existing?.minimum || 1}
            />
            <div className="flex min-w-0 flex-col">
              <label className="mb-1.5 block text-[10px] font-[680] text-muted">
                Material image (optional)
              </label>
              <label className="flex min-h-[90px] cursor-pointer flex-col items-center justify-center gap-[5px] border border-dashed border-line-strong bg-input text-muted">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setPreview(URL.createObjectURL(file))
                  }}
                />
                <ImagePlus size={19} />
                <span className="text-[10px] font-[650]">
                  {preview ? 'Choose a different image' : 'Upload an image from this device'}
                </span>
                <small className="text-[8px] text-subtle">
                  Image preview only; not uploaded to a server.
                </small>
              </label>
              {preview && (
                <img
                  className="mt-2 max-h-[130px] object-cover"
                  src={preview}
                  alt="Listing preview"
                />
              )}
            </div>
            <p className="-mt-1 min-h-0 text-[10px] text-danger">{error}</p>
            <div className="mt-[3px] flex justify-end gap-2">
              <Button
                variant="outline-dark"
                type="button"
                onClick={() => navigate('/seller-dashboard/listings')}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Check size={16} /> {existing ? 'Save changes' : 'Publish demo listing'}
              </Button>
            </div>
          </form>
        )}
        <aside className="border border-line bg-surface-tint p-[17px] max-md:-order-1">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[4px] bg-surface text-eyebrow [&>svg]:w-[18px]">
            <ShieldCheck />
          </span>
          <h3 className="mt-3.5 mb-[5px] text-[13px] font-semibold tracking-[-0.03em] text-ink">
            Make a clear listing
          </h3>
          <p className="text-[9px] leading-[1.7] text-muted">
            Accurate details help buyers understand what you can supply. Do not include private
            information or unverified certification claims.
          </p>
          <div className="mt-2.5 flex items-center gap-[7px] text-[9px] text-muted [&>svg]:w-[15px] [&>svg]:text-eyebrow">
            <CheckCircle2 /> Include a specific location
          </div>
          <div className="mt-2.5 flex items-center gap-[7px] text-[9px] text-muted [&>svg]:w-[15px] [&>svg]:text-eyebrow">
            <CheckCircle2 /> Add condition and timing
          </div>
          <div className="mt-2.5 flex items-center gap-[7px] text-[9px] text-muted [&>svg]:w-[15px] [&>svg]:text-eyebrow">
            <CheckCircle2 /> Keep quantity and units clear
          </div>
          <p className="mt-4 text-[9px] leading-[1.5] text-subtle">
            Your listing appears in this local browser demo only.
          </p>
        </aside>
      </div>
    </>
  )
}
