import { ReactNode } from 'react'
import AuthNavigation from '@/components/layout/auth-navigation'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <AuthNavigation />
      {children}
    </main>
  )
}
