// @ts-nocheck
import { User } from '@prisma/client'
import { db } from './db'
import { env } from '@/env.mjs'

export const freelancerPlan: SubscriptionPlan = {
  name: 'Freelancer',
  description:
    'The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.',
  stripePriceId: env.STRIPE_FREELANCER_MONTHLY_PLAN_ID,
}

export const startupPlan: SubscriptionPlan = {
  name: 'Startup',
  description: 'The PRO plan has unlimited posts.',
  stripePriceId: env.STRIPE_STARTUP_MONTHLY_PLAN_ID,
}

export const enterprisePlan: SubscriptionPlan = {
  name: 'Enterprise',
  description: 'The PRO plan has unlimited posts.',
  stripePriceId: env.STRIPE_ENTERPRISE_MONTHLY_PLAN_ID,
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan =
    user.stripePriceId === startupPlan.stripePriceId
      ? startupPlan
      : user.stripePriceId === freelancerPlan.stripePriceId
        ? freelancerPlan
        : enterprisePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
