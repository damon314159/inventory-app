import accessorsInstance from '../db/index.js'
import { camelToSnake, snakeToCamel } from '../utils/index.js'
import type {
  Category,
  CategoryQuery,
  CategoryService,
  CreateCategoryParams,
  CreateService,
  DeleteCategoryParams,
  ReadCategoryParams,
  UpdateCategoryParams,
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
    'createdAt',
    'updatedAt',
  ])
  const modifiableColumns = new Set<
    keyof Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
  >(['name', 'description', 'url'])

  const camelCaseQueryResult = (category: CategoryQuery): Category =>
    Object.fromEntries(
      Object.entries(category).map(([key, val]): unknown[] => [
        snakeToCamel(key),
        val,
      ])
    ) as Category

  const createCategory = async ({
    name,
    description,
    url,
  }: CreateCategoryParams): Promise<Category | null> =>
    (
      await query(
        'INSET INTO category(name, description, url) VALUES($1, $2, $3) RETURNING *',
        [name, description || null, url]
      )
    ).rows.map(camelCaseQueryResult)[0] ?? null

  const readCategories = async (
    matcher: ReadCategoryParams
  ): Promise<Category[]> => {
    const keys = Object.keys(matcher)
    const vals = Object.values(matcher)

    const isSafe = keys.every((key): boolean => columns.has(key as never))
    if (!isSafe) {
      throw new Error(
        'Matcher contained keys not present in the category table'
      )
    }
    const whereClause: string = keys
      .map((key, i): string => `${camelToSnake(key)} = $${i + 1}`)
      .join(' AND ')
    return (
      await query(`SELECT * FROM category WHERE ${whereClause}`, vals)
    ).rows.map(camelCaseQueryResult)
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

  const updateCategory = async ({
    id,
    data,
  }: UpdateCategoryParams): Promise<Category | null> => {
    const keys = Object.keys(data)
    const vals = Object.values(data)

    const isSafe = keys.every((key): boolean =>
      modifiableColumns.has(key as never)
    )
    if (!isSafe) {
      throw new Error(
        'Data contained keys not present in the category table that are modifiable'
      )
    }
    if (keys.length === 0) {
      throw new Error('Data contained nothing to update')
    }

    const setClause: string = keys
      .map((key, i): string => `${camelToSnake(key)} = $${i + 1}`)
      .join(', ')
    return (
      (
        await query(
          `UPDATE category SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
          [...vals, id]
        )
      ).rows.map(camelCaseQueryResult)[0] ?? null
    )
  }

  const deleteCategory = async ({
    id,
  }: DeleteCategoryParams): Promise<void> => {
    await query('DELETE FROM category WHERE id = $1', [id])
  }

  return {
    createCategory,
    deleteCategory,
    readCategories,
    readCategory,
    updateCategory,
  }
}

const categoryService = CreateCategoryService({ accessors: accessorsInstance })
export default categoryService

export { CreateCategoryService }
