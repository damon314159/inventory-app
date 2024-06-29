import type { Item } from '../../models/index.js'

export type CreateItemParams = Omit<Item, 'id' | 'created_at' | 'updated_at'>

export type ReadItemParams = Partial<Item>

export interface UpdateItemParams {
  id: number
  data: Partial<Omit<Item, 'id' | 'created_at' | 'updated_at'>>
}

export interface DeleteItemParams {
  id: number
}

// Interface is not a valid type here, since the string index is not provided
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ItemService = {
  createItem: (params: CreateItemParams) => Promise<Item | null>
  readItems: (params: ReadItemParams) => Promise<Item[]>
  readItem: (params: ReadItemParams) => Promise<Item | null>
  updateItem: (params: UpdateItemParams) => Promise<Item | null>
  deleteItem: (params: DeleteItemParams) => Promise<void>
}
