import type { Dependencies } from '../abstract/Dependencies.js'
import type { Service } from '../abstract/Service.js'
import type { CategoryService } from './CategoryService.js'
import type { Item } from '../../models/index.js'

export type CreateItemParams = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>

export type ReadItemParams = Partial<Item>

export interface UpdateItemParams {
  id: number
  data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface DeleteItemParams {
  id: number
}

export interface ItemService extends Service {
  createItem: (params: CreateItemParams) => Promise<Item | null>
  readItems: (params: ReadItemParams) => Promise<Item[]>
  readItem: (params: ReadItemParams) => Promise<Item | null>
  updateItem: (params: UpdateItemParams) => Promise<Item | null>
  deleteItem: (params: DeleteItemParams) => Promise<void>
}

export interface ItemServiceDeps extends Dependencies {
  categoryService: CategoryService
}
