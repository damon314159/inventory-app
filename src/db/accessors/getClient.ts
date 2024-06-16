import type { Pool, PoolClient } from 'pg'
import type { GetClient } from '../../types/index.js'

const createGetClient =
  (pool: Pool): GetClient =>
  (): Promise<PoolClient> =>
    pool.connect()

export default createGetClient
