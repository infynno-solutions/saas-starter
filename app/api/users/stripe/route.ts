import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { env } from '@/env.mjs'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import {
  enterprisePlan,
  freelancerPlan,
  getUserSubscriptionPlan,
  startupPlan,
} from '@/lib/subscription'

const billingUrl = `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing`

export async function GET(req: NextRequest) {
  try {
    const planName = req.nextUrl.searchParams.get('stripePlanId') as string
    let stripePlanId = ''
    if (planName === 'freelancer') {
      stripePlanId = freelancerPlan.stripePriceId
    }
    if (planName === 'startup') {
      stripePlanId = startupPlan.stripePriceId
    }
    if (planName === 'enterprise') {
      stripePlanId = enterprisePlan.stripePriceId
    }

    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [
        {
          price: stripePlanId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
