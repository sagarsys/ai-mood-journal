'use client'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  const { message, name } = error
  return (
    <div className="h-full flex-center bg-background px-4 text-center">
      <div className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700 ease-in-out">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive-foreground/15 p-4">
            <ShieldAlert className="h-12 w-12 text-destructive-foreground" aria-hidden="true" />
          </div>
        </div>

        <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{name ?? 'Something went wrong!'}</h1>
        {message ?
          <code
            className="block w-full lg:w-[600px] text-destructive-foreground bg-destructive-foreground/15 break-all mx-auto mt-6 mb-12 p-8">
            {message}
          </code>
          :
          <p className="mb-8 max-w-md text-destructive-foreground/60">
            An unexpected error occurred. We've been notified and are working to fix the issue.
          </p>
        }

        <Button asChild size="lg" variant="link" className="mt-4 font-bold text-lg">
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  )
}