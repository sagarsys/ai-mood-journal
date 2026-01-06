import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db/client'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { analyze } from '@/utils/ai'
import { Analysis } from '@prisma/client'

export const PATCH = async (request: Request, { params }: { params: { id: string }} )  => {
  const user = await getUserByClerkId();
  const { content } = await request.json();
  const id = (await params).id;

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id
      },
   },
    data: { content }
  })

  const analysis = await analyze(updatedEntry.content);
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      ...analysis as Analysis,
      entryId: updatedEntry.id,
    },
    update: analysis as Analysis,
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis: updatedAnalysis} })
}