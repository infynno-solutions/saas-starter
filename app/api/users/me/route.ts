import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { z } from 'zod'

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    const user = await db.user.findUnique({ where: { id: currentUser?.id } })
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 })
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
