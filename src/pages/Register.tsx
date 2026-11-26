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
        <span className="text-[10px] font-[760] tracking-[0.13em] text-[#63806b] uppercase dark:text-[#a6c5ab]">
          {t('auth.registerEyebrow')}
        </span>
        <h1 className="mt-2 mb-1.5 font-serif text-[34px] font-medium tracking-[-0.035em] text-[#252e28] max-md:text-[31px] dark:text-[#edf4ef]">
          {type ? t('auth.registerTitle') : t('auth.chooseOption')}
        </h1>
        <p className="m-0 text-[11px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
          {t('auth.registerText')}
        </p>
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
            className="flex min-h-[150px] flex-col items-start gap-[7px] rounded-[8px] border border-[#dde5dc] bg-white p-[18px] text-left text-[#252e28] transition duration-[180ms] hover:-translate-y-0.5 hover:border-[#88a58e] hover:shadow-[0_10px_24px_rgba(34,66,45,0.09)] dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#edf4ef] dark:hover:border-[#78a185] dark:hover:shadow-none"
            onClick={() => setType('buyer')}
          >
            <span className="grid h-[42px] w-[42px] place-items-center rounded-[8px] bg-[#edf3eb] text-[#173b2d] dark:bg-[#1b3024] dark:text-[#a6c5ab]">
              <ShoppingBag size={24} />
            </span>
            <b className="mt-1 text-[15px]">{t('common.buyer')}</b>
            <span className="text-[11px] text-[#526157] dark:text-[#b2beb5]">
              {t('auth.buyerCardDescription')}
            </span>
            <small className="text-[9px] text-[#7c887f] dark:text-[#b2beb5]">
              {t('auth.findUseful')}
            </small>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            className="flex min-h-[150px] flex-col items-start gap-[7px] rounded-[8px] border border-[#dde5dc] bg-white p-[18px] text-left text-[#252e28] transition duration-[180ms] hover:-translate-y-0.5 hover:border-[#88a58e] hover:shadow-[0_10px_24px_rgba(34,66,45,0.09)] dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#edf4ef] dark:hover:border-[#78a185] dark:hover:shadow-none"
            onClick={() => setType('seller')}
          >
            <span className="grid h-[42px] w-[42px] place-items-center rounded-[8px] bg-[#edf3eb] text-[#173b2d] dark:bg-[#1b3024] dark:text-[#a6c5ab]">
              <Wheat size={24} />
            </span>
            <b className="mt-1 text-[15px]">{t('common.seller')}</b>
            <span className="text-[11px] text-[#526157] dark:text-[#b2beb5]">
              {t('auth.sellerCardDescription')}
            </span>
            <small className="text-[9px] text-[#7c887f] dark:text-[#b2beb5]">
              {t('auth.supplyByProducts')}
            </small>
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
                    ? 'border-[#89a18a] bg-[#f1f6ef] text-[#315a3d] dark:border-[#78a185] dark:bg-[#223128] dark:text-[#edf4ef]'
                    : 'border-[#e1e7df] bg-white text-[#69766c] dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]'
                }`}
                onClick={() => setType('buyer')}
              >
                <ShoppingBag size={19} />
                <b className="text-[11px]">{t('common.buyer')}</b>
                <small className="text-[9px] text-[#879187] dark:text-[#b2beb5]">
                  {t('auth.findUseful')}
                </small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={type === 'seller'}
                className={`grid grid-cols-[27px_1fr] items-center gap-x-2 gap-y-0.5 rounded-[3px] border p-[11px] text-left [&>svg]:row-span-2 ${
                  type === 'seller'
                    ? 'border-[#89a18a] bg-[#f1f6ef] text-[#315a3d] dark:border-[#78a185] dark:bg-[#223128] dark:text-[#edf4ef]'
                    : 'border-[#e1e7df] bg-white text-[#69766c] dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]'
                }`}
                onClick={() => setType('seller')}
              >
                <Wheat size={19} />
                <b className="text-[11px]">{t('common.seller')}</b>
                <small className="text-[9px] text-[#879187] dark:text-[#b2beb5]">
                  {t('auth.supplyByProducts')}
                </small>
              </button>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-[7px] border-0 bg-transparent p-0 text-[12px] font-[680] text-[#285d41] hover:text-[#173b2d] dark:text-[#dbe8df]"
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
            <label className="mb-1.5 block text-[10px] font-[680] text-[#58665c] dark:text-[#b2beb5]">
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
              className="min-h-[41px] w-full rounded-[3px] border border-[#dfe5de] bg-white px-2.5 py-[9px] text-[11px] text-[#435147] outline-none placeholder:text-[#a0a9a0] focus:border-[#78977e] focus:ring-2 focus:ring-[#567f5c]/10 dark:border-[#405247] dark:bg-[#152019] dark:text-[#edf4ef] dark:placeholder:text-[#93a098]"
            />
          </div>
          <p className="-mt-1 min-h-0 text-[10px] text-[#a74b43]">{error}</p>
          <Button type="submit">
            {type === 'buyer' ? t('auth.createBuyer') : t('auth.createSeller')}{' '}
            <ArrowRight size={16} />
          </Button>
          <p className="mt-0.5 mb-0 text-center text-[10px] text-[#748077] dark:text-[#b2beb5]">
            {t('auth.already')}{' '}
            <Link to="/login" className="font-bold text-[#386849] dark:text-[#dbe8df]">
              {t('common.login')}
            </Link>
          </p>
          <p className="m-0 text-[9px] leading-[1.5] text-[#89938a] dark:text-[#b2beb5]">
            {t('auth.noAccount')}
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
