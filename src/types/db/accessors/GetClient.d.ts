import type { PoolClient } from 'pg'

export type GetClient = () => Promise<PoolClient>
