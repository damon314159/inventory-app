import type { Category } from '../../models/index.js'

export interface CreateCategoryParams {
  name: string
  description?: string
  url: string
}

export type ReadCategoryParams =
  | { id: number; name: undefined }
  | { name: string; id: undefined }

// Interface is not a valid type here, since the string index is not provided
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryService = {
  createCategory: (params: CreateCategoryParams) => Promise<Category | null>
  readCategory: (params: ReadCategoryParams) => Promise<Category | null>
}
