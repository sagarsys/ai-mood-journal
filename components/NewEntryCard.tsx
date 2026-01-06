'use client'

import { useRouter } from 'next/navigation'
import { createNewEntry } from '@/utils/api'
import { JournalEntry } from '@/prisma/generated/client'

const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const entry: JournalEntry = await createNewEntry()
    router.push(`/journal/${entry.id}`)
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-blue-50 shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 h-full sm:p-6 flex justify-center items-center">
        <span className="text-3xl font-bold text-black/80">+ New Entry</span>
      </div>
    </div>
  )
}

export default NewEntry