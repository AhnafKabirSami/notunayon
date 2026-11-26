import { useEffect, useState } from 'react'
import type { Theme } from '../types/index.ts'
import { applyTheme, getInitialTheme, THEME_STORAGE_KEY } from './theme.ts'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<Theme>
      setTheme(customEvent.detail)
    }
    window.addEventListener('notunayon-theme-change', handleThemeChange)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) setTheme(event.newValue === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('notunayon-theme-change', handleThemeChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  return { theme, setTheme, toggleTheme }
}
