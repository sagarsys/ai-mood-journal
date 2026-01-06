import React from 'react'
import { Analysis, JournalEntry } from '@/prisma/generated/client'

type EntryCardProps = {
  entry: JournalEntry & { analysis: Analysis }
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toDateString()
  const { subject, negative, color, summary, mood } = entry.analysis;
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow text-black/80">
      <div className="px-4 py-5 sm:px-6 truncate">{date}: <span className="capitalize font-bold">{subject}</span></div>
      <div className="px-4 py-5">{summary}</div>
      <div className={`px-4 py-4 font-bold text-center capitalize ${negative ? 'text-white' : 'text-black'}`} style={{ background: color }}>{mood}</div>
    </div>
  )
}

export default EntryCard