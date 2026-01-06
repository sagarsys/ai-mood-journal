import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db/client'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { Analysis, JournalEntry } from '@/prisma/generated/client'
import { analyze } from '@/utils/ai'
import { getEntriesQuery } from '@/utils/db/query'

export const GET = async() => {
  const entries = await getEntriesQuery()

  return NextResponse.json(entries)
}

export const POST = async () => {
  const user = await getUserByClerkId()

  const entry: JournalEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day...',
    }
  })

  const analysis = await analyze(entry.content);

  await prisma.analysis.create({
    data: {
      ...(analysis as unknown as Analysis),
      entryId: entry.id,
    }
  })

  return NextResponse.json({ entry })
}