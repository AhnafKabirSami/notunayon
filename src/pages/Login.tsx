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
      <div className="auth-form-head">
        <span className="eyebrow">{t('auth.loginEyebrow')}</span>
        <h1>{t('auth.loginTitle')}</h1>
        <p>{t('auth.loginText')}</p>
      </div>
      {forgot ? (
        <SuccessState
          title={t('auth.resetDemo')}
          text={t('auth.resetText')}
          close={() => setForgot(false)}
        />
      ) : (
        <form className="form-stack" onSubmit={submit}>
          <Field
            label={t('auth.emailOrPhone')}
            name="identity"
            placeholder="you@example.com or +880 1XXX..."
            required
          />
          <PasswordField />
          <div className="remember-row">
            <label>
              <input type="checkbox" name="remember" /> {t('auth.remember')}
            </label>
            <button type="button" className="text-link" onClick={() => setForgot(true)}>
              {t('auth.forgot')}
            </button>
          </div>
          <p className="form-error">{error}</p>
          <Button type="submit">
            {t('common.login')} <ArrowRight size={16} />
          </Button>
          <p className="auth-foot">
            {t('auth.newHere')} <Link to="/register">{t('auth.createDemo')}</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
