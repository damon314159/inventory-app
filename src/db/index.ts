import pg, { type Pool } from 'pg'
import createGetClient from './accessors/getClient.js'
import createQuery from './accessors/query.js'
import type { Accessors, GetClient, Query } from '../types/index.js'

const pool: Pool = new pg.Pool({
  database: process.env.DB_NAME ?? 'inventory_app',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER,
})

const query: Query = createQuery(pool)
const getClient: GetClient = createGetClient(pool)
const accessors: Accessors = { getClient, query }

export default accessors
export { getClient, pool, query }
