import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import { Field } from '../components/ui/FormFields.tsx'
import SuccessState from '../components/ui/SuccessState.tsx'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'
  const [sent, setSent] = useState(false)

  return (
    <main className="page-main contact-page">
      <div className="page-intro container">
        <div>
          <span className="eyebrow">{t('common.contact')}</span>
          <h1>
            {bn
              ? 'ভালো উপকরণ সংযোগ নিয়ে কথা বলুন।'
              : 'Let’s talk about better material connections.'}
          </h1>
          <p>
            {bn
              ? 'সরবরাহ, তালিকাভুক্তি বা পরিবহন নিয়ে প্রশ্ন? এই ডেমো ফর্মে বার্তা লিখুন।'
              : 'Questions about sourcing, listing, or logistics? Send a message through this frontend demo.'}
          </p>
        </div>
      </div>
      <div className="container contact-grid">
        <div className="contact-info">
          <div className="contact-info-card">
            <Mail />
            <div>
              <span>{t('auth.email')}</span>
              <b>hello@notunayon.example</b>
              <small>
                {bn ? 'প্রোটোটাইপের নমুনা যোগাযোগ' : 'Placeholder contact for prototype'}
              </small>
            </div>
          </div>
          <div className="contact-info-card">
            <Phone />
            <div>
              <span>{t('auth.phone')}</span>
              <b>+880 1700-000000</b>
              <small>{bn ? 'নমুনা ফোন নম্বর' : 'Placeholder contact for prototype'}</small>
            </div>
          </div>
          <div className="contact-info-card">
            <MapPin />
            <div>
              <span>{bn ? 'স্মূলে' : 'Based in'}</span>
              <b>{bn ? 'বাংলাদেশ' : 'Bangladesh'}</b>
              <small>
                {bn
                  ? 'সারা দেশের কৃষি সম্প্রদায়ের জন্য'
                  : 'Serving agricultural communities nationwide'}
              </small>
            </div>
          </div>
          <div className="faq-card">
            <h3>{bn ? 'প্রায়শই জিজ্ঞাসিত' : 'Frequently asked'}</h3>
            <details>
              <summary>{bn ? 'তালিকাগুলো যাচাই করা কি?' : 'Are listings verified?'}</summary>
              <p>
                {bn
                  ? 'না। এই প্রোটোটাইপের সব তথ্য নমুনা।'
                  : 'No. All supplier and material details on this prototype are sample information.'}
              </p>
            </details>
            <details>
              <summary>
                {bn ? 'এখানে লেনদেন করা যাবে?' : 'Can I complete a transaction here?'}
              </summary>
              <p>
                {bn
                  ? 'না। পেমেন্ট বা আসল লেনদেন হচ্ছে না।'
                  : 'No payments or real transactions are processed. Offers are frontend demonstrations.'}
              </p>
            </details>
          </div>
        </div>
        <div className="contact-form-card">
          {sent ? (
            <SuccessState
              title={bn ? 'বার্তা পেয়েছি।' : 'Message received.'}
              text={
                bn
                  ? 'নতুনায়ন ডেমো ফর্ম জমা হয়েছে। কোনো বার্তা সার্ভারে পাঠানো হয়নি।'
                  : 'Thanks for trying the Notunayon contact demo. No message was sent to a server.'
              }
            />
          ) : (
            <form
              className="form-stack"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <h2>{bn ? 'আমাদের কাছে লিখুন' : 'Send us a message'}</h2>
              <p className="form-help">
                {bn
                  ? 'চিহ্নিত ঘরগুলো এই ডেমোতে প্রয়োজন।'
                  : 'Fields marked required are needed for this demo.'}
              </p>
              <div className="form-row">
                <Field label={bn ? 'আপনার নাম' : 'Your name'} name="name" required />
                <Field label={bn ? 'ইমেইল' : 'Email address'} name="email" type="email" required />
              </div>
              <Field
                label={bn ? 'কিসের বিষয়ে যোগাযোগ?' : 'I’m contacting about'}
                name="subject"
                as="select"
                options={
                  bn
                    ? [
                        'উপকরণ সংগ্রহ',
                        'উপ-বর্জ্য তালিকা',
                        'ব্যবসায়িক অংশীদারিত্ব',
                        'পরিবহন ও সরবরাহ',
                        'অন্যান্য',
                      ]
                    : [
                        'Sourcing materials',
                        'Listing by-products',
                        'Business partnership',
                        'Transport and logistics',
                        'Other',
                      ]
                }
              />
              <Field
                label={bn ? 'বার্তা' : 'Message'}
                name="message"
                as="textarea"
                required
                placeholder={
                  bn ? 'আপনার প্রয়োজন সংক্ষেপে লিখুন' : 'Tell us a little about what you need'
                }
              />
              <Button type="submit">
                {bn ? 'বার্তা পাঠান' : 'Send message'} <ArrowRight size={17} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
