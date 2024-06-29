import type { Category } from '../../models/index.js'

export interface CreateCategoryParams {
  name: string
  description?: string
  url: string
}

export type ReadCategoryParams = Partial<Category>

export interface UpdateCategoryParams {
  id: number
  data: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>
}

// Interface is not a valid type here, since the string index is not provided
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryService = {
  createCategory: (params: CreateCategoryParams) => Promise<Category | null>
  readCategory: (params: ReadCategoryParams) => Promise<Category | null>
  updateCategory: (params: UpdateCategoryParams) => Promise<Category | null>
}
