import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const POST = async (
  _: Request,
  { params }: { params: { token: string } },
) => {
  const { token } = params

  const exists = await db.verificationToken.findUnique({ where: { token } })

  if (!exists) {
    return NextResponse.json({
      verified: false,
      error: 'Invalid or expired verification token.',
    })
  }

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: exists.identifier },
      data: {
        emailVerified: new Date(Date.now()),
      },
    })
    await tx.verificationToken.delete({
      where: { id: exists.id },
    })
  })

  return NextResponse.json({ verified: true })
}
