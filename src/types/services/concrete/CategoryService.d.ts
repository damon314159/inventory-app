import type { Category } from '../../models/index.js'

export type CreateCategoryParams = Omit<
  Category,
  'id' | 'createdAt' | 'updatedAt'
>

export type ReadCategoryParams = Partial<Category>

export interface UpdateCategoryParams {
  id: number
  data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface DeleteCategoryParams {
  id: number
}

// Interface is not a valid type here, since the string index is not provided
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryService = {
  createCategory: (params: CreateCategoryParams) => Promise<Category | null>
  readCategories: (params: ReadCategoryParams) => Promise<Category[]>
  readCategory: (params: ReadCategoryParams) => Promise<Category | null>
  updateCategory: (params: UpdateCategoryParams) => Promise<Category | null>
  deleteCategory: (params: DeleteCategoryParams) => Promise<void>
}
