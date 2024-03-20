import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import Footer from '@/components/layout/footer'
import Navigation from '@/components/layout/navigation'
import { authOptions } from '@/lib/auth'

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Navigation session={session} />
      {children}
      <Footer />
    </main>
  )
}
