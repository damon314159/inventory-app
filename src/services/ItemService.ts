import accessorsInstance from '../db/index.js'
import { camelToSnake, snakeToCamel } from '../utils/index.js'
import filterNullish from '../utils/objectFilterNullish.js'
import categoryServiceInstance from './CategoryService.js'
import type {
  CreateItemParams,
  CreateService,
  DeleteItemParams,
  Item,
  ItemQuery,
  ItemService,
  ItemServiceDeps,
  ReadItemParams,
  UpdateItemParams,
} from '../types/index.js'

const CreateItemService: CreateService<ItemService, ItemServiceDeps> = ({
  accessors,
  dependencies: { categoryService },
}): ItemService => {
  if (!accessors) {
    throw new TypeError('CreateItemService requires accessors to be non null')
  }
  const { query } = accessors

  const columns = new Set<keyof Item>([
    'id',
    'name',
    'description',
    'price',
    'stock',
    'categoryId',
    'createdAt',
    'updatedAt',
  ])
  const modifiableColumns = new Set<
    keyof Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
  >(['name', 'description', 'price', 'stock', 'categoryId'])

  const camelCaseQueryResult = (item: ItemQuery): Item =>
    Object.fromEntries(
      Object.entries(item).map(([key, val]): unknown[] => [
        snakeToCamel(key),
        val,
      ])
    ) as Item

  const createItem = async ({
    name,
    description,
    price,
    stock,
    categoryId,
  }: CreateItemParams): Promise<Item | null> => {
    if (price < 0) {
      throw new Error('Price must not be negative')
    }
    if (stock < 0) {
      throw new Error('Stock must not be negative')
    }

    const category = await categoryService.readCategory({ id: categoryId })
    if (!category) {
      throw new Error('Could not find associated category to create item')
    }

    return (
      (
        await query(
          'INSERT INTO item(name, description, price, stock, category_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
          [name, description || null, price, stock, categoryId]
        )
      ).rows.map(camelCaseQueryResult)[0] ?? null
    )
  }

  const readItems = async (matcher: ReadItemParams): Promise<Item[]> => {
    const nonNullMatcher: Partial<typeof matcher> = filterNullish(matcher)
    const keys = Object.keys(nonNullMatcher)
    const vals = Object.values(nonNullMatcher)

    const isSafe = keys.every((key): boolean => columns.has(key as never))
    if (!isSafe) {
      throw new Error('Matcher contained keys not present in the item table')
    }
    const whereClause: string = keys
      .map((key, i): string => {
        switch (typeof vals[i]) {
          case 'string':
            return `position($${i + 1} in ${camelToSnake(key)}) > 0`
          default:
            return `${camelToSnake(key)} = $${i + 1}`
        }
      })
      .join(' AND ')
    return (
      await query(
        `SELECT * FROM item${whereClause ? ` WHERE ${whereClause}` : ''}`,
        vals
      )
    ).rows.map(camelCaseQueryResult)
  }

  const readItem = async (matcher: ReadItemParams): Promise<Item | null> => {
    const rows: Item[] = await readItems(matcher)
    if (rows.length > 1) {
      throw new Error(
        'Several matching entries found. If this is intended, call readItems instead.'
      )
    }
    return rows[0] ?? null
  }

  const updateItem = async ({
    id,
    data,
  }: UpdateItemParams): Promise<Item | null> => {
    const nonNullData: Partial<typeof data> = filterNullish(data)
    const keys = Object.keys(nonNullData)
    const vals = Object.values(nonNullData)

    const isSafe = keys.every((key): boolean =>
      modifiableColumns.has(key as never)
    )
    if (!isSafe) {
      throw new Error(
        'Data contained keys not present in the item table that are modifiable'
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
          `UPDATE item SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
          [...vals, id]
        )
      ).rows.map(camelCaseQueryResult)[0] ?? null
    )
  }

  const deleteItem = async ({ id }: DeleteItemParams): Promise<void> => {
    await query('DELETE FROM item WHERE id = $1', [id])
  }

  return {
    createItem,
    deleteItem,
    readItem,
    readItems,
    updateItem,
  }
}

const itemService = CreateItemService({
  accessors: accessorsInstance,
  dependencies: { categoryService: categoryServiceInstance },
})
export default itemService

export { CreateItemService }
