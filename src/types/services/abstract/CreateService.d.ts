import type { Accessors } from '../../db/index.js'
import type { Dependencies } from './Dependencies.js'
import type { Service } from './Service.js'

interface CreateServiceParamsWithDeps<D extends Dependencies> {
  accessors?: Accessors
  dependencies: D
}

interface CreateServiceParamsNoDeps {
  accessors?: Accessors
}

export type CreateService<
  S extends Service,
  D extends Dependencies | undefined = undefined,
> = D extends Dependencies
  ? (params: CreateServiceParamsWithDeps<D>) => S
  : (params: CreateServiceParamsNoDeps) => S
