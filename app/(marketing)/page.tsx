import Clients from '@/components/home/clients'
import Features from '@/components/home/features'
import Hero from '@/components/home/hero'
import Pricing from '@/components/home/pricing'
import Testimonials from '@/components/home/testimonials'

const Home = () => {
  return (
    <div>
      <Hero />
      <Clients />
      <Features />
      <Pricing />
      <Testimonials />
    </div>
  )
}

export default Home
