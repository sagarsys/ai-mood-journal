import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/utils/db/client'
import { redirect } from 'next/navigation'
import { UserResource } from '@clerk/types'

const createNewUser = async () => {
  const user = await currentUser() as unknown as UserResource
  await new Promise(resolve => setTimeout(resolve, 10000))
  const match = await prisma.user.findUnique({ where: { clerkId: user.id } })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        updatedAt: new Date()
      }
    })
  }

  redirect('/journal')
}

export default async function NewUserPage() {
  await createNewUser()
  return (
    <div>
      New user Page
    </div>
  )
}