import { z } from 'zod'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { env } from '@/env.mjs'

mailchimp.setConfig({
  apiKey: env.MAILCHIMP_API_KEY,
  server: 'us22',
})

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const listId = env.MAILCHIMP_AUDIENCE_ID

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: data.email,
      status: 'subscribed',
    })

    if (response.status !== 'subscribed') {
      return new Response(null, { status: 400 })
    }

    return new Response(null, { status: 200 })
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
