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
    <main className="min-h-[65vh] bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
      <div className="mx-auto mb-8 flex w-[min(1190px,calc(100%-64px))] items-end justify-between gap-[22px] max-[1000px]:w-[min(100%-42px,850px)] max-md:mb-[22px] max-md:w-[calc(100%-36px)] max-md:flex-col max-md:items-start max-[420px]:w-[calc(100%-28px)]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
            {t('common.contact')}
          </span>
          <h1 className="my-2.5 mb-[9px] max-w-[760px] font-serif text-[clamp(36px,4vw,52px)] leading-[1.08] font-medium tracking-[-0.05em] text-ink max-md:text-[38px]">
            {bn
              ? 'ভালো উপকরণ সংযোগ নিয়ে কথা বলুন।'
              : 'Let’s talk about better material connections.'}
          </h1>
          <p className="m-0 text-[13px] leading-[1.7] text-muted max-md:text-[11px]">
            {bn
              ? 'সরবরাহ, তালিকাভুক্তি বা পরিবহন নিয়ে প্রশ্ন? এই ডেমো ফর্মে বার্তা লিখুন।'
              : 'Questions about sourcing, listing, or logistics? Send a message through this frontend demo.'}
          </p>
        </div>
      </div>
      <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-[0.8fr_1.2fr] items-start gap-7 max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-[420px]:w-[calc(100%-28px)]">
        <div className="grid gap-[11px]">
          <div className="flex items-center gap-3 border border-line bg-surface p-[13px]">
            <Mail className="h-[35px] w-[35px] rounded-[3px] bg-surface-tint p-[9px] text-eyebrow" />
            <div>
              <span className="block text-[9px] text-subtle">{t('auth.email')}</span>
              <b className="mt-[3px] block text-[11px] text-ink-soft">hello@notunayon.example</b>
              <small className="mt-[3px] block text-[9px] text-muted">
                {bn ? 'প্রোটোটাইপের নমুনা যোগাযোগ' : 'Placeholder contact for prototype'}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-line bg-surface p-[13px]">
            <Phone className="h-[35px] w-[35px] rounded-[3px] bg-surface-tint p-[9px] text-eyebrow" />
            <div>
              <span className="block text-[9px] text-subtle">{t('auth.phone')}</span>
              <b className="mt-[3px] block text-[11px] text-ink-soft">+880 1700-000000</b>
              <small className="mt-[3px] block text-[9px] text-muted">
                {bn ? 'নমুনা ফোন নম্বর' : 'Placeholder contact for prototype'}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-line bg-surface p-[13px]">
            <MapPin className="h-[35px] w-[35px] rounded-[3px] bg-surface-tint p-[9px] text-eyebrow" />
            <div>
              <span className="block text-[9px] text-subtle">{bn ? 'স্মূলে' : 'Based in'}</span>
              <b className="mt-[3px] block text-[11px] text-ink-soft">
                {bn ? 'বাংলাদেশ' : 'Bangladesh'}
              </b>
              <small className="mt-[3px] block text-[9px] text-muted">
                {bn
                  ? 'সারা দেশের কৃষি সম্প্রদায়ের জন্য'
                  : 'Serving agricultural communities nationwide'}
              </small>
            </div>
          </div>
          <div className="border border-line bg-surface p-[18px]">
            <h3 className="mb-2.5 text-[14px] font-semibold tracking-[-0.035em] text-ink">
              {bn ? 'প্রায়শই জিজ্ঞাসিত' : 'Frequently asked'}
            </h3>
            <details className="border-t border-line-soft py-2.5">
              <summary className="cursor-pointer text-[10px] font-[650] text-ink-soft">
                {bn ? 'তালিকাগুলো যাচাই করা কি?' : 'Are listings verified?'}
              </summary>
              <p className="mt-1.5 mb-0 text-[10px] leading-[1.7] text-muted">
                {bn
                  ? 'না। এই প্রোটোটাইপের সব তথ্য নমুনা।'
                  : 'No. All supplier and material details on this prototype are sample information.'}
              </p>
            </details>
            <details className="border-t border-line-soft py-2.5">
              <summary className="cursor-pointer text-[10px] font-[650] text-ink-soft">
                {bn ? 'এখানে লেনদেন করা যাবে?' : 'Can I complete a transaction here?'}
              </summary>
              <p className="mt-1.5 mb-0 text-[10px] leading-[1.7] text-muted">
                {bn
                  ? 'না। পেমেন্ট বা আসল লেনদেন হচ্ছে না।'
                  : 'No payments or real transactions are processed. Offers are frontend demonstrations.'}
              </p>
            </details>
          </div>
        </div>
        <div className="border border-line bg-surface-subtle p-[23px] max-md:p-[17px]">
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
              className="flex flex-col gap-[13px]"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <h2 className="m-0 font-serif text-[22px] font-medium tracking-[-0.035em] text-ink">
                {bn ? 'আমাদের কাছে লিখুন' : 'Send us a message'}
              </h2>
              <p className="m-0 text-[9px] leading-[1.5] text-subtle">
                {bn
                  ? 'চিহ্নিত ঘরগুলো এই ডেমোতে প্রয়োজন।'
                  : 'Fields marked required are needed for this demo.'}
              </p>
              <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
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
              <Button type="submit" className="self-start">
                {bn ? 'বার্তা পাঠান' : 'Send message'} <ArrowRight size={17} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
