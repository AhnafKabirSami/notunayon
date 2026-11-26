import type { Theme } from '../types/index.ts'

export const THEME_STORAGE_KEY = 'notunayon-theme'

export function getInitialTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme): Theme {
  const next: Theme = theme === 'dark' ? 'dark' : 'light'
  document.documentElement.dataset.theme = next
  document.documentElement.classList.toggle('dark', next === 'dark')
  document.documentElement.style.colorScheme = next
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // Theme state still works for this session if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent<Theme>('notunayon-theme-change', { detail: next }))
  return next
}
