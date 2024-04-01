import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    STRIPE_API_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_FREELANCER_MONTHLY_PLAN_ID: z.string(),
    STRIPE_STARTUP_MONTHLY_PLAN_ID: z.string(),
    STRIPE_ENTERPRISE_MONTHLY_PLAN_ID: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_FREELANCER_MONTHLY_PLAN_ID:
      process.env.STRIPE_FREELANCER_MONTHLY_PLAN_ID,
    STRIPE_STARTUP_MONTHLY_PLAN_ID: process.env.STRIPE_STARTUP_MONTHLY_PLAN_ID,
    STRIPE_ENTERPRISE_MONTHLY_PLAN_ID:
      process.env.STRIPE_ENTERPRISE_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
