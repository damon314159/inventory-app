import type { QueryResult } from 'pg'

export type Query = (
  queryText: string,
  params: unknown[]
) => Promise<QueryResult>
