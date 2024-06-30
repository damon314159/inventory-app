import type { Category } from '../../models/index.js'
import type { Service } from '../abstract/Service.js'

type CreateCategoryParams = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>

type ReadCategoryParams = Partial<Category>

interface UpdateCategoryParams {
  id: number
  data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>
}

interface DeleteCategoryParams {
  id: number
}

interface CategoryService extends Service {
  createCategory: (params: CreateCategoryParams) => Promise<Category | null>
  readCategories: (params: ReadCategoryParams) => Promise<Category[]>
  readCategory: (params: ReadCategoryParams) => Promise<Category | null>
  updateCategory: (params: UpdateCategoryParams) => Promise<Category | null>
  deleteCategory: (params: DeleteCategoryParams) => Promise<void>
}

export {
  CategoryService,
  CreateCategoryParams,
  DeleteCategoryParams,
  ReadCategoryParams,
  UpdateCategoryParams,
}
