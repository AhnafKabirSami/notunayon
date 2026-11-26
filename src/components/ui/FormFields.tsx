import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Eye } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.ts'

const inputBaseClass =
  'w-full min-h-[41px] rounded-[3px] border border-[#dfe5de] bg-white px-2.5 py-2 text-[11px] text-[#435147] outline-none placeholder:text-[#a0a9a0] focus:border-[#78977e] focus:ring-2 focus:ring-[#567f5c]/10 dark:border-[#405247] dark:bg-[#152019] dark:text-[#edf4ef] dark:placeholder:text-[#93a098]'

const labelBaseClass =
  'mb-1.5 block text-[10px] font-[680] text-[#58665c] dark:text-[#b2beb5]'

interface FieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string | number
  min?: string | number
  max?: string | number
  step?: string | number
  as?: 'input' | 'textarea' | 'select'
  options?: string[]
}

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
}: FieldProps) {
  const id = `field-${name}`
  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={id} className={labelBaseClass}>
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          rows={3}
          className={`${inputBaseClass} min-h-[82px] resize-y leading-[1.5]`}
        />
      ) : as === 'select' ? (
        <div className="relative flex items-center rounded-[3px] dark:bg-[#1a261f]">
          <select
            id={id}
            name={name}
            required={required}
            className="h-[39px] w-full appearance-none rounded-[3px] border border-[#dfe5de] bg-white pr-8 pl-2.5 text-[10px] text-[#56635a] outline-none focus:border-[#78977e] focus:ring-2 focus:ring-[#567f5c]/10 dark:border-[#405247] dark:bg-[#152019] dark:text-[#edf4ef]"
          >
            {options?.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-2.5 text-[#7a887d]"
          />
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
          className={inputBaseClass}
        />
      )}
    </div>
  )
}

interface SelectFieldProps {
  label: string
  name: string
  options: string[]
  defaultValue?: string
  required?: boolean
  translateCategories?: boolean
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  required = false,
  translateCategories = false,
}: SelectFieldProps) {
  const { t } = useTranslation()
  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={`field-${name}`} className={labelBaseClass}>
        {label}
      </label>
      <div className="relative flex items-center rounded-[3px] dark:bg-[#1a261f]">
        <select
          id={`field-${name}`}
          name={name}
          defaultValue={defaultValue || options[0]}
          required={required}
          className="h-[39px] w-full appearance-none rounded-[3px] border border-[#dfe5de] bg-white pr-8 pl-2.5 text-[10px] text-[#56635a] outline-none focus:border-[#78977e] focus:ring-2 focus:ring-[#567f5c]/10 dark:border-[#405247] dark:bg-[#152019] dark:text-[#edf4ef]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-2.5 text-[#7a887d]"
        />
      </div>
    </div>
  )
}

export function PasswordField() {
  const { t, i18n } = useTranslation()
  const [shown, setShown] = useState(false)
  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor="password" className={labelBaseClass}>
        {t('auth.password')}
      </label>
      <div className="relative">
        <input
          id="password"
          type={shown ? 'text' : 'password'}
          name="password"
          minLength={6}
          placeholder={t('auth.passwordHint')}
          required
          className={`${inputBaseClass} pr-9`}
        />
        <button
          type="button"
          className="absolute top-[3px] right-1 grid h-[34px] w-[33px] place-items-center border-0 bg-transparent text-[#7d897f]"
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
