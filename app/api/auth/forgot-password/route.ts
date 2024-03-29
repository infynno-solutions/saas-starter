import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/db'
import { forgotPasswordSchema } from '@/hooks/auth/use-forgot-password'
import { env } from '@/env.mjs'
import { nanoid } from 'nanoid'
import { resetPasswordEmail } from './helper'

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const userData = forgotPasswordSchema.parse(data)

    const exists = await db.user.findUnique({
      where: { email: userData.email },
    })

    if (!exists) {
      return NextResponse.json(
        { message: 'User is not registered.' },
        { status: 404 },
      )
    }

    const newToken = nanoid(32)

    await db.verificationToken.update({
      where: { identifier: exists.id },
      data: {
        resetToken: newToken,
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      },
    })

    const resend = new Resend(env.RESEND_API_KEY)

    const emailSent = await resend.emails.send({
      from: 'onboarding@resend.dev',
      subject: 'Reset your SaaS Starter password',
      // TODO: Remove static email address and add the userData.email (reques user's email address)
      to: 'sahib.infynno@gmail.com',
      html: resetPasswordEmail.replace('VERIFICATION_TOKEN', newToken),
    })

    if (!emailSent) {
      return NextResponse.json(
        { message: 'Something went wrong!' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      message: 'Reset link has been sent to your email.',
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { message: 'Something went wrong!!' },
      { status: 500 },
    )
  }
}
