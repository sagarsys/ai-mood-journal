import 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig, Pool } from '@neondatabase/serverless'

import ws from 'ws'
import dotenv from 'dotenv'

const isProd = process.env.NODE_ENV === 'production'

dotenv.config({ path: isProd ? '.env' : `.env.${process.env.NODE_ENV}` })

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

if (!isProd) global.prisma = prisma

export default prisma