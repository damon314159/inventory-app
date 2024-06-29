import type { Accessors } from '../db/index.js'
import type { Dependencies } from './Dependencies.js'
import type { Service } from './Service.js'

export interface CreateServiceParameters<
  D extends Dependencies = Dependencies,
> {
  accessors?: Accessors
  dependencies?: D
}

export type CreateService<
  S extends Service = Service,
  D extends Dependencies = Dependencies,
> = ({ accessors, dependencies }: CreateServiceParameters<D>) => S
