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
  )
}

export default BillingHome
