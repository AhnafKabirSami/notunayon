import type { ReactNode } from 'react'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
