import type { Query } from '../../types/index.js'
import type { Pool, QueryResult } from 'pg'

const createQuery =
  (pool: Pool): Query =>
  (queryText: string, params?: unknown[]): Promise<QueryResult> =>
    pool.query(queryText, params)

export default createQuery
