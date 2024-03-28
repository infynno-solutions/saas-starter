import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LuCheck } from 'react-icons/lu'

export const tiers = [
  {
    name: 'Freelancer',
    id: 'freelancer',
    priceMonthly: '$24',
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    mostPopular: false,
    stripePriceId: 'price_1OypIuSATZcifcIP0Luj9oho',
  },
  {
    name: 'Startup',
    id: 'startup',
    priceMonthly: '$32',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
    stripePriceId: 'price_1OypJESATZcifcIPyMtAMan5',
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    priceMonthly: '$48',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
    ],
    mostPopular: false,
    stripePriceId: 'price_1OypJgSATZcifcIPW2FNqZyp',
  },
]

const Plans = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (stripePlanId: string) => {
    setIsLoading(!isLoading)

    const response = await fetch(
      `/api/users/stripe?stripePlanId=${stripePlanId}`,
    )

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
        variant: 'destructive',
      })
    }

    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return tiers.map((tier, tierIdx) => (
    <div
      key={tier.id}
      className={cn(
        tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
        tierIdx === 0 ? 'lg:rounded-r-none' : '',
        tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
        'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-x-4">
          <h3
            className={cn(
              tier.mostPopular ? 'text-black' : 'text-gray-900',
              'text-lg font-semibold leading-8',
            )}
            id={tier.id}
          >
            {tier.name}
          </h3>
          {tier.mostPopular ? (
            <p className="rounded-full bg-black/10 px-2.5 py-1 text-xs font-semibold leading-5 text-black">
              Most popular
            </p>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {tier.description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {tier.priceMonthly}
          </span>
          <span className="text-sm font-semibold leading-6 text-gray-600">
            /month
          </span>
        </p>
        <ul
          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
          role="list"
        >
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <LuCheck
                aria-hidden="true"
                className="h-6 w-5 flex-none text-black"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mt-8"
        onClick={() =>
          isLoggedIn ? onSubmit(tier.id) : router.push('/auth/login')
        }
      >
        Buy plan
      </Button>
    </div>
  ))
}

export default Plans
