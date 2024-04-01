import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    const user = await db.user.findUnique({ where: { id: currentUser?.id } })
    if (user) {
      return NextResponse.json(user, { status: 200 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}
