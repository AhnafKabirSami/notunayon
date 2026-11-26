import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Eye } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.js'

export function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  defaultValue,
  min,
  max,
  step,
  as,
  options,
}) {
  const id = `field-${name}`
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          rows="3"
        />
      ) : as === 'select' ? (
        <div className="select-shell">
          <select id={id} name={name} required={required}>
            {options?.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={15} />
        </div>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  )
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  required = false,
  translateCategories = false,
}) {
  const { t } = useTranslation()
  return (
    <div className="form-group">
      <label htmlFor={`field-${name}`}>{label}</label>
      <div className="select-shell">
        <select
          id={`field-${name}`}
          name={name}
          defaultValue={defaultValue || options[0]}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}
            </option>
          ))}
        </select>
        <ChevronDown size={15} />
      </div>
    </div>
  )
}

export function PasswordField() {
  const { t, i18n } = useTranslation()
  const [shown, setShown] = useState(false)
  return (
    <div className="form-group">
      <label htmlFor="password">{t('auth.password')}</label>
      <div className="password-shell">
        <input
          id="password"
          type={shown ? 'text' : 'password'}
          name="password"
          minLength="6"
          placeholder={t('auth.passwordHint')}
          required
        />
        <button
          type="button"
          aria-label={
            shown
              ? i18n.resolvedLanguage === 'bn'
                ? 'পাসওয়ার্ড লুকান'
                : 'Hide password'
              : i18n.resolvedLanguage === 'bn'
                ? 'পাসওয়ার্ড দেখান'
                : 'Show password'
          }
          onClick={() => setShown(!shown)}
        >
          <Eye size={16} />
        </button>
      </div>
    </div>
  )
}
