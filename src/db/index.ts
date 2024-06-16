import pg, { type Pool } from 'pg'
import createQuery from './accessors/query.js'
import createGetClient from './accessors/getClient.js'
import type { GetClient, Query } from '../types/index.js'

const pool: Pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) ?? 5432,
  database: process.env.DB_NAME ?? 'inventory_app',
})

const query: Query = createQuery(pool)
const getClient: GetClient = createGetClient(pool)

export { pool, query, getClient }
