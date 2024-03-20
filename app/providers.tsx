'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Providers
