import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import Button from '../ui/Button.jsx'

function SearchBox({ initialValue = '', onSearch, compact = false }) {
  const { t } = useTranslation()
  const [value, setValue] = useState(initialValue)

  function submit(e) {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className={`search-box ${compact ? 'search-compact' : ''}`} onSubmit={submit}>
      <Search size={20} className="search-icon" />

      <input
        aria-label={t('home.searchMaterials')}
        placeholder={t('home.searchPlaceholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {value && (
        <button
          className="search-clear"
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

      <Button type="submit">
        <Search size={17} /> {t('home.searchMaterials')}
      </Button>
    </form>
  )
}

export default SearchBox
