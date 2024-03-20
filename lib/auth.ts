import * as bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { db } from './db'
import { env } from '@/env.mjs'

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { type: 'email', name: 'email' },
        password: { type: 'password', name: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided.')
        }

        const { email, password } = credentials

        const user = await db.user.findUnique({ where: { email } })

        if (!user) {
          throw new Error('User is not registered.')
        }

        if (!user.password) {
          throw new Error('Registered using third party login.')
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
          throw new Error('Invalid credentials.')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
}
