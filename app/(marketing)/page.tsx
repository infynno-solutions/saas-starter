import Clients from '@/components/home/clients'
import Features from '@/components/home/features'
import Hero from '@/components/home/hero'
import Pricing from '@/components/home/pricing/pricing'
import Testimonials from '@/components/home/testimonials'
import { getCurrentUser } from '@/lib/session'

const Home = async () => {
  const user = await getCurrentUser()
  return (
    <div>
      <Hero />
      <Clients />
      <Features />
      <Pricing isLoggedIn={user ? true : false} />
      <Testimonials />
    </div>
  )
}

export default Home
