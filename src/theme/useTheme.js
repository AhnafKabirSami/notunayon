import { useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, THEME_STORAGE_KEY } from './theme.js'

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const handleThemeChange = (event) => setTheme(event.detail)
    window.addEventListener('notunayon-theme-change', handleThemeChange)
    const handleStorage = (event) => {
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
