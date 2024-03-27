'use client'

import Plans, { tiers } from '@/components/home/pricing/plans'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchCurrentUser } from '@/hooks/user/use-fetch-current-user'
import { cn } from '@/lib/utils'
import React from 'react'
import moment from 'moment'

const BillingHome = () => {
  const { data: userData, isLoading } = useFetchCurrentUser()
  const user = userData?.data

  const getSubscribedPlan = () =>
    tiers.find((t) => t.stripePriceId === user?.stripePriceId)

  const SkeletonLoader = () => {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-6 w-[260px]" />
        <div>
          <Skeleton className="h-6 w-96" />
          <Skeleton className="mt-1 h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    )
  }
  return (
    <div className="ml-20 flex flex-col gap-8 px-20 py-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold md:text-4xl">Billing</h1>
        <p className="text-lg text-secondary-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>

      <div
        className={cn(
          'flex flex-col gap-8 rounded-lg',
          user?.stripeSubscriptionId &&
            'border border-black/10 bg-card p-6 shadow-sm',
        )}
      >
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            {/* Current Plan (If any) & Heading  */}
            <div className="flex flex-col gap-1">
              {user?.stripeSubscriptionId && (
                <span className="text-lg font-semibold tracking-tight">
                  Subscription Plan
                </span>
              )}

              <p
                className={cn(
                  'w-max text-secondary-foreground',
                  !user?.stripePriceId && 'hidden',
                )}
              >
                You are currently on the{' '}
                <strong className="capitalize">
                  {user?.stripePriceId ? getSubscribedPlan()?.name : 'Free'}
                </strong>{' '}
                plan.
              </p>
            </div>

            <div className={cn(!user?.stripePriceId && 'hidden')}>
              {user?.stripePriceId ? (
                <p className="font-medium">
                  Your {getSubscribedPlan()?.name} plan has{' '}
                  {getSubscribedPlan()?.features[0]} and{' '}
                  {getSubscribedPlan()?.features[1]}.
                </p>
              ) : (
                <p className="font-medium">
                  The free plan is limited to 3 posts. Upgrade to the PRO plan
                  for unlimited posts.
                </p>
              )}
            </div>

            {/* Manage Subscription Button & Expiry Date */}
            <div className="flex items-center justify-between">
              {user?.stripePriceId && (
                <>
                  <Button>Manage Subscription</Button>
                  <p className="text-xs font-medium">
                    Your plan renews on{' '}
                    {moment(user.stripeCurrentPeriodEnd).format('LL')}.
                  </p>
                </>
              )}
            </div>

            {/* Subscription Plans  */}
            {!user?.stripeSubscriptionId && (
              <div
                className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                id="plans"
              >
                <Plans isLoggedIn={user ? true : false} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BillingHome
