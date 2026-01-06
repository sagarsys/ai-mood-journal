import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db/client'
import Editor from '@/components/Editor'
import type { Analysis as AnalysisType, JournalEntry } from '@/prisma/generated/client'

type Props = {
  params: { id: string }
}

export type JournalEntryWithAnalysis = JournalEntry & { analysis: AnalysisType|null }

const getEntry = async (id: string): Promise<JournalEntryWithAnalysis | null> => {
  const user = await getUserByClerkId();

  return prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
    include: { analysis: true }
  })
}

export default async function EntryPage ({ params }: Props) {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry || !entry.analysis) return null;

  return <Editor entry={entry}></Editor>
};
