import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/utils/db/client'

export async function getUserByClerkId() {
  const { userId } = await auth()

  return prisma.user.findUniqueOrThrow({
    where: { clerkId: userId as string },
  })
}