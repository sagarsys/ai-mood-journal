import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 border-b" suppressHydrationWarning>
        <Link href="/" className="text-2xl font-bold px-8 hover:underline underline-offset-2">
          Mood Journal
        </Link>
      <Link href={"/journal"} className="font-bold hover:underline underline-offset-2">Journal</Link>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}