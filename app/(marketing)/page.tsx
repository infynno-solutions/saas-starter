import Clients from '@/components/home/clients'
import Features from '@/components/home/features'
import Hero from '@/components/home/hero'
import Pricing from '@/components/home/pricing'
import Testimonials from '@/components/home/testimonials'
import NewsLetter from '@/components/news-letter'
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
      <NewsLetter />
    </div>
  )
}

export default Home
