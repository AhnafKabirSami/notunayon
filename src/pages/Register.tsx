import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ShoppingBag, Wheat } from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import type { DemoUser, UserRole } from '../types/index.ts'
import AuthLayout from '../components/block/AuthLayout.tsx'
import Button from '../components/ui/Button.tsx'
import { Field, PasswordField } from '../components/ui/FormFields.tsx'
import SuccessState from '../components/ui/SuccessState.tsx'

export default function Register() {
  const { t, i18n } = useTranslation()
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [type, setType] = useState<UserRole | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() || !type) {
      setError(t('auth.requiredError'))
      return
    }
    const data = new FormData(form)
    const account: DemoUser = {
      name: data.get('name')?.toString() || 'Demo User',
      type,
    }
    localStorage.setItem('notunayon-demo-user', JSON.stringify(account))
    setUser(account)
    setSuccess(true)
    setError('')
  }

  return (
    <AuthLayout>
      <div className="mb-[21px]">
        <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
          {t('auth.registerEyebrow')}
        </span>
        <h1 className="mt-2 mb-1.5 font-serif text-[34px] font-medium tracking-[-0.035em] text-ink max-md:text-[31px]">
          {type ? t('auth.registerTitle') : t('auth.chooseOption')}
        </h1>
        <p className="m-0 text-[11px] leading-[1.7] text-muted">{t('auth.registerText')}</p>
      </div>
      {success ? (
        <SuccessState
          title={t('auth.profileCreated')}
          text={t('auth.profileStored')}
          close={() => navigate(`/${type}-dashboard`)}
        />
      ) : !type ? (
        <div
          className="mt-1.5 grid grid-cols-2 gap-3 max-md:grid-cols-1"
          role="radiogroup"
          aria-label={t('auth.chooseOption')}
        >
          <button
            type="button"
            role="radio"
            aria-checked="false"
            className="flex min-h-[150px] flex-col items-start gap-[7px] rounded-[8px] border border-line bg-surface p-[18px] text-left text-ink transition duration-[180ms] hover:-translate-y-0.5 hover:border-eyebrow hover:shadow-[0_10px_24px_rgba(34,66,45,0.09)] dark:hover:shadow-none"
            onClick={() => setType('buyer')}
          >
            <span className="grid h-[42px] w-[42px] place-items-center rounded-[8px] bg-surface-tint text-accent">
              <ShoppingBag size={24} />
            </span>
            <b className="mt-1 text-[15px]">{t('common.buyer')}</b>
            <span className="text-[11px] text-muted">{t('auth.buyerCardDescription')}</span>
            <small className="text-[9px] text-subtle">{t('auth.findUseful')}</small>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            className="flex min-h-[150px] flex-col items-start gap-[7px] rounded-[8px] border border-line bg-surface p-[18px] text-left text-ink transition duration-[180ms] hover:-translate-y-0.5 hover:border-eyebrow hover:shadow-[0_10px_24px_rgba(34,66,45,0.09)] dark:hover:shadow-none"
            onClick={() => setType('seller')}
          >
            <span className="grid h-[42px] w-[42px] place-items-center rounded-[8px] bg-surface-tint text-accent">
              <Wheat size={24} />
            </span>
            <b className="mt-1 text-[15px]">{t('common.seller')}</b>
            <span className="text-[11px] text-muted">{t('auth.sellerCardDescription')}</span>
            <small className="text-[9px] text-subtle">{t('auth.supplyByProducts')}</small>
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-[13px]" onSubmit={submit}>
          <div className="flex items-end justify-between gap-2.5 max-md:flex-col max-md:items-stretch">
            <div
              className="grid flex-1 grid-cols-2 gap-[9px]"
              role="radiogroup"
              aria-label={t('auth.chooseOption')}
            >
              <button
                type="button"
                role="radio"
                aria-checked={type === 'buyer'}
                className={`grid grid-cols-[27px_1fr] items-center gap-x-2 gap-y-0.5 rounded-[3px] border p-[11px] text-left [&>svg]:row-span-2 ${
                  type === 'buyer'
                    ? 'border-eyebrow bg-surface-tint text-link'
                    : 'border-line bg-surface text-muted'
                }`}
                onClick={() => setType('buyer')}
              >
                <ShoppingBag size={19} />
                <b className="text-[11px]">{t('common.buyer')}</b>
                <small className="text-[9px] text-subtle">{t('auth.findUseful')}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={type === 'seller'}
                className={`grid grid-cols-[27px_1fr] items-center gap-x-2 gap-y-0.5 rounded-[3px] border p-[11px] text-left [&>svg]:row-span-2 ${
                  type === 'seller'
                    ? 'border-eyebrow bg-surface-tint text-link'
                    : 'border-line bg-surface text-muted'
                }`}
                onClick={() => setType('seller')}
              >
                <Wheat size={19} />
                <b className="text-[11px]">{t('common.seller')}</b>
                <small className="text-[9px] text-subtle">{t('auth.supplyByProducts')}</small>
              </button>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-[7px] border-0 bg-transparent p-0 text-[12px] font-[680] text-link hover:text-link-hover"
              onClick={() => setType(type === 'buyer' ? 'seller' : 'buyer')}
            >
              {t('auth.changeRole')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field label={t('auth.fullName')} name="name" required />
            <Field
              label={type === 'seller' ? t('auth.farmBusiness') : t('auth.businessName')}
              name="business"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field label={t('auth.email')} name="email" type="email" required />
            <Field
              label={t('auth.phone')}
              name="phone"
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-[9px] max-[420px]:grid-cols-1">
            <Field
              label={t('auth.location')}
              name="location"
              placeholder={i18n.resolvedLanguage === 'bn' ? 'জেলা, বাংলাদেশ' : 'District, Bangladesh'}
              required
            />
            <Field
              label={t('auth.industry')}
              name="industry"
              placeholder={
                i18n.resolvedLanguage === 'bn' ? 'খামার, রাইস মিল…' : 'Compost, manufacturing…'
              }
              required
            />
          </div>
          <PasswordField />
          <div className="flex min-w-0 flex-col">
            <label className="mb-1.5 block text-[10px] font-[680] text-muted">
              {type === 'seller'
                ? i18n.resolvedLanguage === 'bn'
                  ? 'যে উপকরণ সরবরাহ করবেন'
                  : 'Materials you can supply'
                : t('auth.materialsInterest')}
            </label>
            <input
              name="materials"
              placeholder={
                i18n.resolvedLanguage === 'bn'
                  ? 'ধানের তুষ, গোবর…'
                  : 'Crop residues, rice by-products…'
              }
              className="min-h-[41px] w-full rounded-[3px] border border-input-border bg-input px-2.5 py-[9px] text-[11px] text-ink-soft outline-none placeholder:text-placeholder focus:border-eyebrow focus:ring-2 focus:ring-eyebrow/15"
            />
          </div>
          <p className="-mt-1 min-h-0 text-[10px] text-danger">{error}</p>
          <Button type="submit">
            {type === 'buyer' ? t('auth.createBuyer') : t('auth.createSeller')}{' '}
            <ArrowRight size={16} />
          </Button>
          <p className="mt-0.5 mb-0 text-center text-[10px] text-muted">
            {t('auth.already')}{' '}
            <Link to="/login" className="font-bold text-link">
              {t('common.login')}
            </Link>
          </p>
          <p className="m-0 text-[9px] leading-[1.5] text-subtle">{t('auth.noAccount')}</p>
        </form>
      )}
    </AuthLayout>
  )
}
