import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

export default async function HomePage() {
  const { userId } = await auth()
  const href = userId ? '/journal' : '/new-user';
  
  return (
    <div className="h-full w-full flex-center">
      <div className="mx-auto px-8">
        <h1 className="text-3xl font-bold">
          The best Journaling app, ever!
        </h1>
        <p className="text-xl opacity-60 mt-3">Track your journaling mood</p>
        <Link href={href}>
          <Button variant="outline" className="mt-4">Get started</Button>
        </Link>
      </div>
    </div>
  )
}
