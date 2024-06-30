import type { GetClient } from '../../types/index.js'
import type { Pool, PoolClient } from 'pg'

const createGetClient =
  (pool: Pool): GetClient =>
  (): Promise<PoolClient> =>
    pool.connect()

export default createGetClient
