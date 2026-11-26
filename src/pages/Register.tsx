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
      <div className="auth-form-head">
        <span className="eyebrow">{t('auth.registerEyebrow')}</span>
        <h1>{type ? t('auth.registerTitle') : t('auth.chooseOption')}</h1>
        <p>{t('auth.registerText')}</p>
      </div>
      {success ? (
        <SuccessState
          title={t('auth.profileCreated')}
          text={t('auth.profileStored')}
          close={() => navigate(`/${type}-dashboard`)}
        />
      ) : !type ? (
        <div className="role-selection" role="radiogroup" aria-label={t('auth.chooseOption')}>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            className="role-card"
            onClick={() => setType('buyer')}
          >
            <span className="role-card-icon">
              <ShoppingBag size={24} />
            </span>
            <b>{t('common.buyer')}</b>
            <span>{t('auth.buyerCardDescription')}</span>
            <small>{t('auth.findUseful')}</small>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            className="role-card"
            onClick={() => setType('seller')}
          >
            <span className="role-card-icon">
              <Wheat size={24} />
            </span>
            <b>{t('common.seller')}</b>
            <span>{t('auth.sellerCardDescription')}</span>
            <small>{t('auth.supplyByProducts')}</small>
          </button>
        </div>
      ) : (
        <form className="form-stack role-form" onSubmit={submit}>
          <div className="role-switch-row">
            <div
              className="account-type-select"
              role="radiogroup"
              aria-label={t('auth.chooseOption')}
            >
              <button
                type="button"
                role="radio"
                aria-checked={type === 'buyer'}
                className={type === 'buyer' ? 'selected' : ''}
                onClick={() => setType('buyer')}
              >
                <ShoppingBag size={19} />
                <b>{t('common.buyer')}</b>
                <small>{t('auth.findUseful')}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={type === 'seller'}
                className={type === 'seller' ? 'selected' : ''}
                onClick={() => setType('seller')}
              >
                <Wheat size={19} />
                <b>{t('common.seller')}</b>
                <small>{t('auth.supplyByProducts')}</small>
              </button>
            </div>
            <button
              type="button"
              className="text-link role-change"
              onClick={() => setType(type === 'buyer' ? 'seller' : 'buyer')}
            >
              {t('auth.changeRole')}
            </button>
          </div>
          <div className="form-row">
            <Field label={t('auth.fullName')} name="name" required />
            <Field
              label={type === 'seller' ? t('auth.farmBusiness') : t('auth.businessName')}
              name="business"
              required
            />
          </div>
          <div className="form-row">
            <Field label={t('auth.email')} name="email" type="email" required />
            <Field
              label={t('auth.phone')}
              name="phone"
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              required
            />
          </div>
          <div className="form-row">
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
          <div className="form-group">
            <label>
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
            />
          </div>
          <p className="form-error">{error}</p>
          <Button type="submit">
            {type === 'buyer' ? t('auth.createBuyer') : t('auth.createSeller')}{' '}
            <ArrowRight size={16} />
          </Button>
          <p className="auth-foot">
            {t('auth.already')} <Link to="/login">{t('common.login')}</Link>
          </p>
          <p className="form-help">{t('auth.noAccount')}</p>
        </form>
      )}
    </AuthLayout>
  )
}
