import { z } from 'zod'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { env } from '@/env.mjs'
import { NextResponse } from 'next/server'

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
      return NextResponse.json(null, { status: 400 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}
