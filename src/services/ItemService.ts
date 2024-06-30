import accessorsInstance from '../db/index.js'
import categoryServiceInstance from './CategoryService.js'
import type {
  CategoryService,
  CreateItemParams,
  CreateService,
  DeleteItemParams,
  Item,
  ItemService,
  ReadItemParams,
  UpdateItemParams,
} from '../types/index.js'

const CreateItemService: CreateService<
  ItemService,
  { categoryService: CategoryService }
> = ({ accessors, dependencies: { categoryService } }): ItemService => {
  if (!accessors) {
    throw new TypeError('CreateItemService requires accessors to be non null')
  }
  const { query } = accessors

  const columns = new Set<keyof Item>([
    'id',
    'name',
    'description',
    'url',
    'price',
    'stock',
    'category_id',
    'created_at',
    'updated_at',
  ])
  const modifiableColumns = new Set<
    keyof Omit<Item, 'id' | 'created_at' | 'updated_at'>
  >(['name', 'description', 'url', 'price', 'stock', 'category_id'])

  const createItem = async ({
    name,
    description,
    url,
    price,
    stock,
    category_id,
  }: CreateItemParams): Promise<Item | null> => {
    if (price < 0) {
      throw new Error('Price must not be negative')
    }
    if (stock < 0) {
      throw new Error('Stock must not be negative')
    }

    // TODO attempt to find category with matching ID before querying

    return (
      (
        await query(
          'INSET INTO item(name, description, url, price, stock, category_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
          [name, description || null, url, price, stock, category_id]
        )
      ).rows[0] ?? null
    )
  }

  const readItems = async (matcher: ReadItemParams): Promise<Item[]> => {
    const keys = Object.keys(matcher)
    const vals = Object.values(matcher)

    const isSafe = keys.every((key): boolean => columns.has(key as never))
    if (!isSafe) {
      throw new Error('Matcher contained keys not present in the item table')
    }
    const whereClause: string = keys
      .map((key, i): string => `${key} = $${i + 1}`)
      .join(' AND ')
    return (await query(`SELECT * FROM item WHERE ${whereClause}`, vals)).rows
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
    const keys = Object.keys(data)
    const vals = Object.values(data)

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
      .map((key, i): string => `${key} = $${i + 1}`)
      .join(', ')
    return (
      (
        await query(
          `UPDATE item SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
          [...vals, id]
        )
      ).rows[0] ?? null
    )
  }

  const deleteItem = async ({ id }: DeleteItemParams): Promise<void> => {
    await query('DELETE FROM item WHERE id = $1', [id])
  }

  return {
    createItem,
    readItems,
    readItem,
    updateItem,
    deleteItem,
  }
}

const itemService = CreateItemService({
  accessors: accessorsInstance,
  dependencies: { categoryService: categoryServiceInstance },
})
export default itemService

export { CreateItemService }
