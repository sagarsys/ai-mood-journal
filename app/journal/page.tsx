import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db/client'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { JournalEntry } from '@/prisma/generated/client'

const getEntries = async () => {
  const user = await getUserByClerkId();

  return prisma.journalEntry.findMany({
    where: { userId: user?.id as string },
    include: { analysis: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function JournalPage() {
  const entries: JournalEntry[] = await getEntries();

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
