import type { CategoryService } from './CategoryService.js'
import type { Item } from '../../models/index.js'
import type { Dependencies } from '../abstract/Dependencies.js'
import type { Service } from '../abstract/Service.js'

type CreateItemParams = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>

type ReadItemParams = Partial<Item>

interface UpdateItemParams {
  id: number
  data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
}

interface DeleteItemParams {
  id: number
}

interface ItemService extends Service {
  createItem: (params: CreateItemParams) => Promise<Item | null>
  readItems: (params: ReadItemParams) => Promise<Item[]>
  readItem: (params: ReadItemParams) => Promise<Item | null>
  updateItem: (params: UpdateItemParams) => Promise<Item | null>
  deleteItem: (params: DeleteItemParams) => Promise<void>
}

interface ItemServiceDeps extends Dependencies {
  categoryService: CategoryService
}

export {
  CreateItemParams,
  DeleteItemParams,
  ItemService,
  ItemServiceDeps,
  ReadItemParams,
  UpdateItemParams,
}
