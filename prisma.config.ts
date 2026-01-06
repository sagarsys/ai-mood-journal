import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'
import { existsSync } from 'fs'

// Only load local env files if DATABASE_URL is not already set
// This allows production scripts to set DATABASE_URL before Prisma reads this config
if (!process.env.DATABASE_URL) {
  // Load .env first, then .env.local (which will override .env values)
  config({ path: '.env' });
  if (existsSync('.env.local')) {
    config({ path: '.env.local', override: true });
  }
} else {
  // DATABASE_URL is already set (e.g., from production script)
  // Still load .env for other variables, but don't override DATABASE_URL
  config({ path: '.env' });
}


export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env("DATABASE_URL")
  }
})

