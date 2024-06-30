/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg, { type Pool, type PoolClient } from 'pg'

// Replace CommonJS __dirname with an ESM alternative
// eslint-disable-next-line no-underscore-dangle
const __dirname: string = dirname(fileURLToPath(import.meta.url))

const pool: Pool = new pg.Pool({
  database: process.env.DB_NAME ?? 'inventory_app',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER,
})

const runMigrations = async (): Promise<void> => {
  const migrationFiles: string[] = [
    '01_create_category.sql',
    '02_create_item.sql',
    '03_create_updated_at_trigger.sql',
  ]

  for (let i = 0; i < migrationFiles.length; i += 1) {
    const filename: string = migrationFiles[i]
    const client: PoolClient = await pool.connect()
    try {
      const sql: string = await readFile(
        join(__dirname, 'migrations', filename),
        'utf-8'
      )
      await client.query(sql)
      console.log(`Executed migration ${filename}`)
    } catch (err) {
      console.error(`Error running migration ${filename}: ${err}`)
    }
    client.release()
  }
}

await runMigrations()
await pool.end()
console.log('Migrations complete - pool drained')
