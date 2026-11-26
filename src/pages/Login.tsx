import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import type { DemoUser } from '../types/index.ts'
import AuthLayout from '../components/block/AuthLayout.tsx'
import Button from '../components/ui/Button.tsx'
import { Field, PasswordField } from '../components/ui/FormFields.tsx'
import SuccessState from '../components/ui/SuccessState.tsx'

export default function Login() {
  const { t } = useTranslation()
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const identity = data.get('identity')?.toString() || ''
    const password = data.get('password')?.toString() || ''
    if (!identity || !password) {
      setError('Enter your email or phone and password.')
      return
    }
    const account: DemoUser = {
      name: identity.split('@')[0] || 'Demo User',
      type: 'buyer',
    }
    localStorage.setItem('notunayon-demo-user', JSON.stringify(account))
    setUser(account)
    navigate('/buyer-dashboard')
  }

  return (
    <AuthLayout>
      <div className="mb-[21px]">
        <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
          {t('auth.loginEyebrow')}
        </span>
        <h1 className="mt-2 mb-1.5 font-serif text-[34px] font-medium tracking-[-0.035em] text-ink max-md:text-[31px]">
          {t('auth.loginTitle')}
        </h1>
        <p className="m-0 text-[11px] leading-[1.7] text-muted">{t('auth.loginText')}</p>
      </div>
      {forgot ? (
        <SuccessState
          title={t('auth.resetDemo')}
          text={t('auth.resetText')}
          close={() => setForgot(false)}
        />
      ) : (
        <form className="flex flex-col gap-[13px]" onSubmit={submit}>
          <Field
            label={t('auth.emailOrPhone')}
            name="identity"
            placeholder="you@example.com or +880 1XXX..."
            required
          />
          <PasswordField />
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-[5px] text-[10px] text-muted">
              <input type="checkbox" name="remember" className="accent-eyebrow" />{' '}
              {t('auth.remember')}
            </label>
            <button
              type="button"
              className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-[12px] font-[680] text-link hover:text-link-hover"
              onClick={() => setForgot(true)}
            >
              {t('auth.forgot')}
            </button>
          </div>
          <p className="-mt-1 min-h-0 text-[10px] text-danger">{error}</p>
          <Button type="submit">
            {t('common.login')} <ArrowRight size={16} />
          </Button>
          <p className="mt-0.5 mb-0 text-center text-[10px] text-muted">
            {t('auth.newHere')}{' '}
            <Link to="/register" className="font-bold text-link">
              {t('auth.createDemo')}
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
