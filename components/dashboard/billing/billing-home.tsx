'use client'

import Plans from '@/components/home/pricing/plans'
import { useFetchCurrentUser } from '@/hooks/user/use-fetch-current-user'
import React from 'react'
import BillingDetails from './billing-details'
import { SkeletonLoader } from './skeleton-loader'

const BillingHome = () => {
  const { data: userData, isLoading } = useFetchCurrentUser()
  const user = userData?.data

  return (
    <div className="ml-20 flex flex-col gap-8 px-20 py-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold md:text-4xl">Billing</h1>
        <p className="text-lg text-secondary-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>

      <div className="flex flex-col gap-8 rounded-lg">
        {isLoading ? (
          <SkeletonLoader />
        ) : user?.stripeSubscriptionId && user?.stripePriceId ? (
          <BillingDetails user={user} />
        ) : (
          <div
            className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            id="plans"
          >
            <Plans isLoggedIn={user ? true : false} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BillingHome
