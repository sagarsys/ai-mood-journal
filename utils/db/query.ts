import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db/client'

export const getEntriesQuery = async () => {
  const user = await getUserByClerkId();

  return prisma.journalEntry.findMany({
    where: { userId: user?.id as string },
    include: { analysis: true },
    orderBy: { createdAt: 'desc' }
  })
}