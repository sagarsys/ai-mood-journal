import React from 'react'
import { Analysis, JournalEntry } from '@/prisma/generated/client'

type EntryCardProps = {
  entry: JournalEntry & { analysis?: Analysis }
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toDateString()

  console.log(entry)

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow text-black/80">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      {entry.analysis && <>
        <div className="px-4 py-5">{entry.analysis.summary}</div>
        <div className="px-4 py-4">{entry.analysis.mood}</div>
      </>}
    </div>
  )
}

export default EntryCard