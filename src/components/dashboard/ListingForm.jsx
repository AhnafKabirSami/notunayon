import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, CheckCircle2, ImagePlus, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/useApp.js'
import { categories } from '../../data/mockData.js'
import { photo } from '../../utils/marketplace.js'
import Button from '../ui/Button.jsx'
import { Field, SelectField } from '../ui/FormFields.jsx'
import SuccessState from '../ui/SuccessState.jsx'
import DashPageHeader from './DashPageHeader.jsx'

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

  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name').toString().trim()
    const price = Number(data.get('price'))
    const quantity = Number(data.get('quantity'))
    if (!name || price <= 0 || quantity <= 0) {
      setError('Enter a material name, price, and positive quantity.')
      return
    }
    const record = {
      ...(existing || {}),
      id: existing?.id || `demo-${Date.now()}`,
      name,
      category: data.get('category').toString(),
      price,
      unit: data.get('priceUnit').toString(),
      quantity,
      quantityUnit: data.get('quantityUnit').toString(),
      seller: data.get('business')?.toString() || 'Demo Farm Collective',
      location: data.get('location').toString(),
      condition: data.get('condition').toString(),
      availability: data.get('availability').toString(),
      frequency: data.get('frequency').toString(),
      minimum: Number(data.get('minimum')) || 1,
      description: data.get('description').toString(),
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
      <div className="listing-form-layout">
        {success ? (
          <div className="dash-panel listing-success">
            <SuccessState
              title={existing ? 'Listing updated.' : 'Your listing is live in the demo.'}
              text="The listing is now visible in the local marketplace and your seller workspace."
              close={() => navigate('/seller-dashboard/listings')}
            />
            <Button
              variant="outline-dark"
              onClick={() => {
                setSuccess(false)
                setFormKey((key) => key + 1)
              }}
            >
              Create another listing
            </Button>
          </div>
        ) : (
          <form key={formKey} className="dash-panel form-stack listing-form" onSubmit={submit}>
            <div className="panel-title">
              <div>
                <h2>Material details</h2>
                <p>Fields marked with * are required.</p>
              </div>
              <span className="demo-tag">MOCK LISTING</span>
            </div>
            <div className="form-row">
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
            <div className="form-row">
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
            <div className="form-row">
              <Field
                label="Available quantity *"
                name="quantity"
                type="number"
                min="0.1"
                step="0.1"
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
            <div className="form-row">
              <Field
                label="Listed price (৳) *"
                name="price"
                type="number"
                min="1"
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
            <label className="check-option">
              <input name="negotiable" type="checkbox" defaultChecked /> Price is negotiable
            </label>
            <div className="form-row">
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
            <div className="form-row">
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
              min="1"
              defaultValue={existing?.minimum || 1}
            />
            <div className="form-group">
              <label>Material image (optional)</label>
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setPreview(URL.createObjectURL(file))
                  }}
                />
                <ImagePlus size={19} />
                <span>{preview ? 'Choose a different image' : 'Upload an image from this device'}</span>
                <small>Image preview only; not uploaded to a server.</small>
              </label>
              {preview && <img className="upload-preview" src={preview} alt="Listing preview" />}
            </div>
            <p className="form-error">{error}</p>
            <div className="form-actions">
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
        <aside className="form-side-note">
          <span className="note-icon">
            <ShieldCheck />
          </span>
          <h3>Make a clear listing</h3>
          <p>
            Accurate details help buyers understand what you can supply. Do not include private
            information or unverified certification claims.
          </p>
          <div className="side-note-row">
            <CheckCircle2 /> Include a specific location
          </div>
          <div className="side-note-row">
            <CheckCircle2 /> Add condition and timing
          </div>
          <div className="side-note-row">
            <CheckCircle2 /> Keep quantity and units clear
          </div>
          <p className="form-help">Your listing appears in this local browser demo only.</p>
        </aside>
      </div>
    </>
  )
}
