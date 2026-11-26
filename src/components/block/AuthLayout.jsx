import { CheckCircle2 } from 'lucide-react'
import Logo from './Logo.jsx'

export default function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-bg" />
        <div className="auth-visual-content">
          <Logo light />
          <span className="eyebrow">Agriculture · exchange · opportunity</span>
          <h2>Give good materials another place to grow.</h2>
          <p>
            Explore a local demonstration marketplace connecting Bangladesh’s agricultural producers
            and businesses.
          </p>
          <div className="auth-points">
            <span>
              <CheckCircle2 size={17} /> Explore sample supply
            </span>
            <span>
              <CheckCircle2 size={17} /> Test a local marketplace flow
            </span>
          </div>
        </div>
      </div>
      <section className="auth-panel">
        <div className="auth-mobile-brand">
          <Logo />
        </div>
        {children}
        <div className="auth-legal">
          By continuing, you’re using a frontend demonstration. No production account is created.
        </div>
      </section>
    </main>
  )
}
