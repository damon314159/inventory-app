import type { Accessors } from '../../db/index.js'
import type { Dependencies } from './Dependencies.js'
import type { Service } from './Service.js'

export interface CreateServiceParams {
  accessors?: Accessors
  dependencies?: Dependencies
}

export type CreateService<S extends Service> = ({
  accessors,
  dependencies,
}: CreateServiceParams) => S
