import { tiers } from '@/components/home/pricing/plans'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { CurrentUserData } from '@/hooks/user/use-fetch-current-user'
import { formatDate } from '@/lib/utils'
import React, { FormEvent } from 'react'

interface BillingDetailsProps {
  user?: CurrentUserData
}

const BillingDetails = ({ user }: BillingDetailsProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const getSubscribedPlan = () =>
    tiers.find((t) => t.stripePriceId === user?.stripePriceId)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch('/api/users/stripe')

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
        variant: 'destructive',
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the{' '}
            <strong>{getSubscribedPlan()?.name}</strong> plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {' '}
          Your {getSubscribedPlan()?.name} plan has{' '}
          {getSubscribedPlan()?.features[0]} and{' '}
          {getSubscribedPlan()?.features[1]}.
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Button disabled={isLoading}>Manage Subscription</Button>
          <p className="text-xs font-medium">
            Your plan renews on {formatDate(user?.stripeCurrentPeriodEnd!)}.
          </p>
        </CardFooter>
      </Card>
    </form>
  )
}

export default BillingDetails
