import type { GetClient } from './accessors/GetClient.js'
import type { Query } from './accessors/Query.js'

interface Accessors {
  getClient: GetClient
  query: Query
}

export { Accessors, GetClient, Query }
