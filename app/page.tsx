import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen w-full flex-center">
      <div className="mx-auto px-8">
        <h1 className="text-3xl font-bold">
          The best Journaling app, ever!
        </h1>
        <p className="text-xl opacity-60 mt-3">Track your journaling mood</p>
        <Link href="/journal">
          <Button variant="outline" className="mt-4">Get started</Button>
        </Link>
      </div>
    </div>
  )
}
