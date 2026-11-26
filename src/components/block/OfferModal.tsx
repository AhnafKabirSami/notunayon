import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import type { Listing } from '../../types/index.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import Button from '../ui/Button.tsx'
import { Field, SelectField } from '../ui/FormFields.tsx'
import Modal from '../ui/Modal.tsx'
import SuccessState from '../ui/SuccessState.tsx'

interface OfferModalProps {
  listing: Listing
  mode: 'offer' | 'contact'
  open: boolean
  close: () => void
}

export default function OfferModal({ listing, mode, open, close }: OfferModalProps) {
  const { t } = useTranslation()
  const { setOffers } = useApp()
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (mode === 'contact') {
      if (!data.get('message')?.toString().trim()) {
        setError('Add a short message to continue.')
        return
      }
      setDone(true)
      setError('')
      return
    }
    if (!data.get('price') || !data.get('quantity')) {
      setError('Enter an offer price and required quantity.')
      return
    }
    setOffers((items) => [
      {
        id: `OFF-${Date.now().toString().slice(-5)}`,
        buyer: 'Demo Buyer',
        material: listing.name,
        price: Number(data.get('price')),
        quantity: `${data.get('quantity')} ${data.get('unit')}`,
        message: data.get('message')?.toString() || 'No message provided.',
        date: 'Just now',
        status: 'Pending',
      },
      ...items,
    ])
    setDone(true)
    setError('')
  }

  return (
    <Modal
      title={
        done
          ? mode === 'contact'
            ? 'Message prepared'
            : 'Offer sent'
          : mode === 'contact'
            ? `Contact ${listing.seller}`
            : `Make an offer for ${marketplaceLabel(t, listing.name, { id: listing.id })}`
      }
      close={close}
    >
      {done ? (
        <SuccessState
          title={mode === 'contact' ? 'Your message is ready.' : 'Your offer is ready.'}
          text={
            mode === 'contact'
              ? 'This local demonstration prepared a message. The seller has not been contacted.'
              : 'This local demonstration has added the offer to the buyer and seller demo views.'
          }
          close={close}
        />
      ) : (
        <form className="form-stack" onSubmit={submit}>
          <p className="form-help">This is a local demo. No real seller will be contacted.</p>
          {mode === 'contact' ? (
            <Field
              label="Message to seller"
              name="message"
              as="textarea"
              placeholder="Ask a question about this material"
              required
            />
          ) : (
            <>
              <Field
                label={`Your price (৳ / ${listing.unit})`}
                name="price"
                type="number"
                min={1}
                defaultValue={listing.price}
                required
              />
              <div className="form-row">
                <Field
                  label="Required quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="e.g. 500"
                  required
                />
                <SelectField label="Unit" name="unit" options={['kg', 'MT']} />
              </div>
              <Field
                label="Message to seller"
                name="message"
                as="textarea"
                placeholder="Share your pickup or sourcing requirements"
              />
            </>
          )}
          <p className="form-error">{error}</p>
          <div className="modal-actions">
            <Button variant="outline-dark" type="button" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">
              <Send size={16} /> {mode === 'contact' ? 'Prepare message' : 'Submit offer'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
