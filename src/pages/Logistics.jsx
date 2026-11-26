import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck } from 'lucide-react'
import { photo } from '../utils/marketplace.js'
import Button from '../components/ui/Button.jsx'
import { Field, SelectField } from '../components/ui/FormFields.jsx'
import SuccessState from '../components/ui/SuccessState.jsx'

export default function Logistics() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="page-main logistics-page">
      <div className="logistics-hero">
        <div className="container logistics-hero-grid">
          <div>
            <span className="eyebrow">Fleet & logistics</span>
            <h1>Move materials from where they are to where they’re needed.</h1>
            <p>
              Explore a demonstration opportunity for local transport partners to support
              agricultural material collection and delivery.
            </p>
            <Link to="#partner-form" className="button button-light">
              Register transport interest <ArrowRight size={17} />
            </Link>
          </div>
          <div className="logistics-hero-image">
            <img
              src={photo('photo-1601584115197-04ecc0da31d7', 1100)}
              alt="Truck supporting agricultural logistics"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span>
              <Truck /> Local transport connections
            </span>
          </div>
        </div>
      </div>
      <div className="container logistics-content">
        <div className="logistics-benefits">
          {[
            ['Collection', 'Coordinate local pickup from a farm, mill, or processor.'],
            ['Consolidation', 'Bring smaller volumes together where practical.'],
            ['Delivery', 'Help move materials to a buyer’s preferred location.'],
          ].map(([title, text]) => (
            <article key={title}>
              <span>
                <Truck size={20} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="partner-form" id="partner-form">
          {submitted ? (
            <SuccessState
              title="Interest recorded."
              text="Your details have been saved only in this page demo. No transport partner was registered."
            />
          ) : (
            <form
              className="form-stack"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <span className="eyebrow">Partner interest</span>
              <h2>Tell us about your transport service.</h2>
              <div className="form-row">
                <Field label="Contact name" name="name" required />
                <Field label="Business / fleet name" name="business" required />
              </div>
              <div className="form-row">
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  required
                />
                <Field label="Base location" name="location" required />
              </div>
              <SelectField
                label="Vehicle type"
                name="vehicle"
                options={['Pickup / mini truck', 'Medium truck', 'Large truck', 'Other']}
              />
              <Field
                label="Service coverage"
                name="coverage"
                as="textarea"
                placeholder="Areas, typical loads, or scheduling details"
              />
              <Button type="submit">
                Register interest <ArrowRight size={17} />
              </Button>
              <small className="form-help">
                Frontend demonstration only; no information is transmitted.
              </small>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
