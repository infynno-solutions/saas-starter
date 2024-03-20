import Link from 'next/link'
import { SiNextdotjs } from 'react-icons/si'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const AuthNavigation = () => {
  return (
    <div className="container p-4">
      <div className="flex items-center justify-between gap-4">
        <Link className="flex items-center gap-1" href="/">
          <SiNextdotjs className="h-8 w-8" />
          <span className="text-xl font-bold">SaaS Starter</span>
        </Link>
        <Link
          className={cn(buttonVariants({ variant: 'outline' }), 'rounded-lg')}
          href="/auth/register"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default AuthNavigation
