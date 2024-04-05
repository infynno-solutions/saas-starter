import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()

    const response = await db.user.create({
      data,
    })

    if (!response) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'User added successfully', user: response },
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

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get('search') ?? ''
    const sortBy = searchParams.get('sortBy') ?? ''
    const sortType = searchParams.get('sortType') ?? 'asc'
    const pageNo = parseInt(searchParams.get('pageNo') ?? '1')
    const perPage = parseInt(searchParams.get('perPage') ?? '10')

    let fetchQuery: any = {
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }],
      },
      skip: pageNo > 1 ? perPage * (pageNo - 1) : 0,
      take: perPage,
    }
    if (sortBy.length > 0) {
      fetchQuery.orderBy = {
        [sortBy]: sortType,
      }
    }

    const [users, count] = await db.$transaction([
      db.user.findMany(fetchQuery),
      db.user.count({ where: fetchQuery.where }),
    ])

    if (!users) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Users fetched successfully', users, totalRecords: count },
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
