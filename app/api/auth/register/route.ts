import * as bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'
import { registerSchema } from '@/hooks/auth/use-register'
import { db } from '@/lib/db'

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const userData = registerSchema.parse(data)

    const exists = await db.user.findUnique({
      where: { email: userData.email },
    })

    if (exists) {
      return NextResponse.json(
        { message: 'User already registered.' },
        { status: 400 },
      )
    }

    userData.password = await bcrypt.hash(userData.password, 12)

    const user = await db.user.create({ data: userData })
    const token = nanoid(32)
    await db.verificationToken.create({
      data: {
        identifier: user.id,
        token,
      },
    })

    return NextResponse.json({ message: 'Success' })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { message: 'Something went wrong!!' },
      { status: 500 },
    )
  }
}
