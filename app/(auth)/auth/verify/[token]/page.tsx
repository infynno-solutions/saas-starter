'use client'

import Link from 'next/link'
import { LuLoader } from 'react-icons/lu'
import { buttonVariants } from '@/components/ui/button'
import { useVerifyEmail } from '@/hooks/auth/use-verify-email'
import { cn } from '@/lib/utils'

interface VerifyProps {
  params: {
    token: string
  }
}

const Verify = ({ params: { token } }: VerifyProps) => {
  const { isFetching, data } = useVerifyEmail(token)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          Verifying your email
        </h1>
        {isFetching ? (
          <LuLoader className="h-16 w-16 animate-spin" />
        ) : (
          data && (
            <div className="flex flex-col items-center gap-4">
              {data.data?.verified ? (
                <>
                  <h3 className="text-2xl">Email verified sucessfully.</h3>
                  <Link
                    className={cn(buttonVariants({ variant: 'default' }))}
                    href="/auth/login"
                  >
                    Login Now
                  </Link>
                </>
              ) : (
                <div className="text-xl text-red-500">{data.data?.error}</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Verify
