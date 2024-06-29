import accessorsInstance from '../db/index.js'
import type { CreateService, Service } from '../types/index.js'

const CreateCategoryService: CreateService = ({ accessors }): Service => ({})

const CategoryService = CreateCategoryService({ accessors: accessorsInstance })
export default CategoryService

export { CreateCategoryService }
