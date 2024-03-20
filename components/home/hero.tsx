import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <div className="py-24 sm:py-32 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Data to enrich your online business
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              className={cn(buttonVariants({ variant: 'default' }))}
              href="/"
            >
              Get started
            </Link>
            <Link
              className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900"
              href="/"
            >
              Learn more{' '}
              <span aria-hidden="true">
                <LuArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
