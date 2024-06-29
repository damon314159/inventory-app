import accessorsInstance from '../db/index.js'
import type {
  Category,
  CategoryService,
  CreateCategoryParams,
  CreateService,
  ReadCategoryParams,
} from '../types/index.js'

const CreateCategoryService: CreateService<CategoryService> = ({
  accessors,
}): CategoryService => {
  if (!accessors) {
    throw new TypeError(
      'CreateCategoryService requires accessors to be non null'
    )
  }
  const { query } = accessors

  const createCategory = async ({
    name,
    description,
    url,
  }: CreateCategoryParams): Promise<Category | null> => {
    if (name === '') {
      throw new Error('name must not be an empty string')
    }
    if (url === '') {
      throw new Error('url must not be an empty string')
    }

    return (
      (
        await query(
          'INSET INTO category(name, description, url) VALUES($1, $2, $3) RETURNING *',
          [name, description || null, url]
        )
      ).rows[0] ?? null
    )
  }

  const readCategory = async ({
    id,
    name,
  }: ReadCategoryParams): Promise<Category | null> => {
    if (id) {
      if (id <= 0 || !Number.isInteger(id)) {
        throw new Error('id must be a positive integer')
      }
      return (
        (await query('SELECT * FROM category WHERE id = $1', [id])).rows[0] ??
        null
      )
    }
    // Else name
    if (name === '') {
      throw new Error('name must not be an empty string')
    }
    return (
      (await query('SELECT * FROM category WHERE name = $1', [name])).rows[0] ??
      null
    )
  }

  return { createCategory, readCategory }
}

const CategoryService = CreateCategoryService({
  accessors: accessorsInstance,
})
export default CategoryService

export { CreateCategoryService }
