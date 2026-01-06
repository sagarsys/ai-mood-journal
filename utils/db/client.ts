import { PrismaClient } from '@/prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'
import { env } from 'prisma/config'

const prismaClientSingleton = () => {
  const connectionString = env('DATABASE_URL')

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const pool = new Pool({ connectionString })
  // @ts-ignore
  const adapter = new PrismaPg(pool)

  return new PrismaClient({ adapter })
}


declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (env('NODE_ENV') !== 'production') globalThis.prismaGlobal = prisma