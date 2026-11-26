import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck } from 'lucide-react'
import { photo } from '../utils/marketplace.ts'
import Button from '../components/ui/Button.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import { Field, SelectField } from '../components/ui/FormFields.tsx'
import SuccessState from '../components/ui/SuccessState.tsx'

export default function Logistics() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-[65vh] pb-[85px] max-md:pb-[60px] dark:bg-[#111915]">
      <div className="bg-[#173b2d] py-[53px] text-white max-md:py-[37px] dark:bg-[#17241d]">
        <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-2 items-center gap-12 max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-md:gap-[22px] max-[420px]:w-[calc(100%-28px)]">
          <div>
            <span className="text-[10px] font-[760] tracking-[0.13em] text-[#b9ccb3] uppercase">
              Fleet & logistics
            </span>
            <h1 className="my-2.5 max-w-[570px] font-serif text-[clamp(36px,4.4vw,53px)] leading-[1.09] font-medium tracking-[-0.035em] text-white max-md:text-[38px]">
              Move materials from where they are to where they’re needed.
            </h1>
            <p className="mb-[21px] max-w-[510px] text-[12px] leading-[1.7] text-[#c9d6cb]">
              Explore a demonstration opportunity for local transport partners to support
              agricultural material collection and delivery.
            </p>
            <Link to="#partner-form" className={buttonClasses({ variant: 'light' })}>
              Register transport interest <ArrowRight size={17} />
            </Link>
          </div>
          <div className="relative h-[305px] overflow-hidden rounded-[4px] bg-[#83917e] max-md:h-[220px]">
            <img
              src={photo('photo-1601584115197-04ecc0da31d7', 1100)}
              alt="Truck supporting agricultural logistics"
              className="block h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-[7px] bg-white/90 p-2 text-[9px] text-[#34463a]">
              <Truck /> Local transport connections
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] pt-[42px] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
        <div className="mb-[35px] grid grid-cols-3 gap-[13px] max-md:grid-cols-1">
          {[
            ['Collection', 'Coordinate local pickup from a farm, mill, or processor.'],
            ['Consolidation', 'Bring smaller volumes together where practical.'],
            ['Delivery', 'Help move materials to a buyer’s preferred location.'],
          ].map(([title, text]) => (
            <article key={title} className="bg-[#f4f7f2] p-[17px] dark:bg-[#1a261f]">
              <span className="grid h-9 w-9 place-items-center bg-[#e4ede2] text-[#4b7255] dark:bg-[#223128] dark:text-[#a6c5ab]">
                <Truck size={20} />
              </span>
              <h3 className="mt-3 mb-1 text-[14px] font-semibold tracking-[-0.035em] text-[#252e28] dark:text-[#edf4ef]">
                {title}
              </h3>
              <p className="m-0 text-[10px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                {text}
              </p>
            </article>
          ))}
        </div>
        <div
          className="mx-auto max-w-[700px] border border-[#e3e9e1] p-[26px] max-md:p-[17px] dark:border-[#34463a] dark:bg-[#1a261f]"
          id="partner-form"
        >
          {submitted ? (
            <SuccessState
              title="Interest recorded."
              text="Your details have been saved only in this page demo. No transport partner was registered."
            />
          ) : (
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <span className="text-[10px] font-[760] tracking-[0.13em] text-[#63806b] uppercase dark:text-[#a6c5ab]">
                Partner interest
              </span>
              <h2 className="m-0 font-serif text-[24px] font-medium tracking-[-0.035em] text-[#252e28] dark:text-[#edf4ef]">
                Tell us about your transport service.
              </h2>
              <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
                <Field label="Contact name" name="name" required />
                <Field label="Business / fleet name" name="business" required />
              </div>
              <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
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
              <Button type="submit" className="self-start">
                Register interest <ArrowRight size={17} />
              </Button>
              <small className="m-0 text-[9px] leading-[1.5] text-[#89938a] dark:text-[#b2beb5]">
                Frontend demonstration only; no information is transmitted.
              </small>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
