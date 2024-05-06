import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { env } from './server/env'

const main = async () => {
  let migrationClient = null

  try {
    migrationClient = postgres(env.DATABASE_URL, { max: 1 })
    await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })
    console.log('Migration completed')
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  } finally {
    if (migrationClient) {
      await migrationClient.end()
    }
  }
}

main()
