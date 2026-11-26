import { useContext } from 'react'
import { AppContext } from './appContext.js'

export function useApp() {
  return useContext(AppContext)
}
