import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const POST = async (
  req: Request,
  { params }: { params: { token: string } },
) => {
  try {
    const data = await req.json()
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token') ?? ''

    const exists = await db.verificationToken.findUnique({
      where: { resetToken: token },
    })

    if (!exists) {
      return NextResponse.json(
        { message: 'User is not registered.' },
        { status: 404 },
      )
    }

    // if (exists.expires && currentTime < exists.expires!) {
    //   return NextResponse.json(
    //     { message: 'Reset password link is expired' },
    //     { status: 400 },
    //   )
    // }

    const updatedPassword = await bcrypt.hash(data.password, 12)

    await db.verificationToken.update({
      where: { resetToken: token },
      data: { expires: new Date() },
    })

    await db.user.update({
      where: {
        id: exists.identifier,
      },
      data: { password: updatedPassword },
    })

    return NextResponse.json({ message: 'Success' })
  } catch (e) {
    return NextResponse.json(
      { message: 'Something went wrong!!' },
      { status: 500 },
    )
  }
}
