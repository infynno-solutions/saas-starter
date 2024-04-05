import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const { userId } = params
    const data = await req.json()

    const response = await db.user.update({
      where: { id: userId },
      data: data,
    })

    if (!response) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'User updated successfully', user: response },
      { status: 200 },
    )
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const { userId } = params

    const response = await db.user.findUnique({
      where: { id: userId },
    })

    if (!response) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'User fetched successfully', user: response },
      { status: 200 },
    )
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const { userId } = params

    const response = await db.user.delete({ where: { id: userId } })

    if (!response) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'User deleted successfully', user: response },
      { status: 200 },
    )
  } catch (error: any) {
    console.log('error', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}
