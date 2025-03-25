import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig, Pool } from '@neondatabase/serverless'

import ws from 'ws'

neonConfig.webSocketConstructor = ws

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true

// Type definitions
declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
export const prisma = global.prisma || new PrismaClient({ adapter, log: ['query'] })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma