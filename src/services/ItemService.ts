import accessorsInstance from '../db/index.js'
import type { CreateService, Service } from '../types/index.js'

const CreateItemService: CreateService = ({ accessors }): Service => ({})

const ItemService = CreateItemService({ accessors: accessorsInstance })
export default ItemService

export { CreateItemService }
