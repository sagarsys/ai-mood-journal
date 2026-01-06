import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { JournalEntry } from '@/prisma/generated/client'
import { getEntriesQuery } from '@/utils/db/query'

export default async function JournalPage() {
  const entries: JournalEntry[] = await getEntriesQuery();

  return (
    <div className="h-full w-full">
      <h1 className="text-2xl mb-8">This is your Journal...</h1>
      <div className="grid grid-cols-3 gap-4 ">
        <NewEntryCard />
        {entries.map((entry: JournalEntry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}
