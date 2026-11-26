import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import Button from '../ui/Button.tsx'

interface SearchBoxProps {
  initialValue?: string
  onSearch: (query: string) => void
  compact?: boolean
  className?: string
}

export default function SearchBox({
  initialValue = '',
  onSearch,
  compact = false,
  className = '',
}: SearchBoxProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState(initialValue)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form
      className={`flex items-center gap-3 rounded-[4px] border border-input-border bg-surface p-[5px] max-md:gap-1.5 max-[420px]:flex-wrap max-[420px]:p-[7px] ${
        compact ? 'min-h-[49px]' : 'min-h-[57px]'
      } ${className}`}
      onSubmit={submit}
    >
      <Search size={20} className="ml-[9px] shrink-0 text-muted" />

      <input
        aria-label={t('home.searchMaterials')}
        placeholder={t('home.searchPlaceholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-[42px] w-5 flex-1 border-0 bg-input px-2 text-[13px] text-ink outline-none placeholder:text-placeholder"
      />

      {value && (
        <button
          className="inline-grid h-[30px] w-[30px] shrink-0 place-items-center border-0 bg-transparent text-muted"
          type="button"
          aria-label={t('common.clear')}
          onClick={() => {
            setValue('')
            onSearch('')
          }}
        >
          <X size={16} />
        </button>
      )}

      <Button
        type="submit"
        className={`${
          compact ? 'min-h-[37px]' : 'min-h-[45px]'
        } max-md:px-2.5 max-md:text-[10px] max-md:[&>svg]:w-[15px] max-[420px]:w-full`}
      >
        <Search size={17} /> {t('home.searchMaterials')}
      </Button>
    </form>
  )
}
