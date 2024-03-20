'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { SiNextdotjs } from 'react-icons/si'
import { buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'

const items = [
  {
    href: '/#features',
    title: 'Features',
  },
  {
    href: '/#pricing',
    title: 'Pricing',
  },
  {
    href: '/#testimonials',
    title: 'Testimonials',
  },
]

interface NavigationProps {
  session: Session | null
}

const Navigation = ({ session }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  const handleLogout = async () => await signOut()

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              className="transition-all duration-300 ease-in-out lg:hidden"
              onClick={toggle}
            >
              {isOpen ? (
                <LuX className="h-6 w-6" />
              ) : (
                <LuMenu className="h-6 w-6" />
              )}
            </button>
            <Link className="flex items-center gap-1" href="/">
              <SiNextdotjs className="h-8 w-8" />
              <span className="hidden text-xl font-bold md:block">
                SaaS Starter
              </span>
            </Link>
          </div>
          <div className="hidden items-center lg:flex">
            {items.map((item, i) => (
              <Link
                key={i}
                className="px-4 font-medium text-gray-700 hover:text-black"
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {!session?.user ? (
            <div className="ml-auto flex items-center gap-4">
              <Link className="text-sm font-medium" href="/auth/login">
                Sign in
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'hidden md:block',
                )}
                href="/auth/register"
              >
                Create an account
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto">
                {session.user.image ? (
                  <Image
                    alt={session.user.name || ''}
                    className="rounded-full"
                    height={32}
                    src={session.user.image}
                    width={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute inset-0 top-16 border-t bg-white animate-in slide-in-from-top-16 lg:hidden">
          <div className="flex flex-col gap-4 p-4">
            {items.map((item, i) => (
              <Link key={i} className="block px-2 font-medium" href={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
