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

  const columns = new Set<keyof Category>([
    'id',
    'name',
    'description',
    'url',
    'created_at',
    'updated_at',
  ])

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

  const readCategories = async (
    matcher: ReadCategoryParams
  ): Promise<Category[]> => {
    const isSafe = Object.keys(matcher).every((key): boolean =>
      columns.has(key as never)
    )
    if (!isSafe) {
      throw new Error(
        'Matcher contained keys not present in the Category table'
      )
    }
    const whereClause: string = Object.keys(matcher)
      .map((key, i): string => `${key} = $${i + 1}`)
      .join(' AND ')
    return (
      await query(
        `SELECT * FROM category WHERE ${whereClause}`,
        Object.values(matcher)
      )
    ).rows
  }

  const readCategory = async (
    matcher: ReadCategoryParams
  ): Promise<Category | null> => {
    const rows: Category[] = await readCategories(matcher)
    if (rows.length > 1) {
      throw new Error(
        'Several matching entries found. If this is intended, call readCategories instead.'
      )
    }
    return rows[0] ?? null
  }

  const updateCategory = async ({ id, data }) => {}

  const deleteCategory = async ({ id }) => {}

  return {
    createCategory,
    readCategories,
    readCategory,
    updateCategory,
    deleteCategory,
  }
}

const CategoryService = CreateCategoryService({
  accessors: accessorsInstance,
})
export default CategoryService

export { CreateCategoryService }
