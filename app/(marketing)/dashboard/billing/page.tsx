import BillingHome from '@/components/dashboard/billing/billing-home'
import React from 'react'

const page = () => {
  return (
    <div className="ml-20 flex flex-col gap-8 px-20 py-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold md:text-4xl">Billing</h1>
        <p className="text-lg text-secondary-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>{' '}
      <BillingHome />
    </div>
  )
}

export default page
