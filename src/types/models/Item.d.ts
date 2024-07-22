interface Item {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
}

interface ItemQuery {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  category_id: number
  created_at: Date
  updated_at: Date
}

interface ItemJoinCategory {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
  categoryName: string
  categoryDescription?: string
}

interface ItemJoinCategoryQuery {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  category_id: number
  created_at: Date
  updated_at: Date
  category_name: string
  category_description?: string
}

export { Item, ItemJoinCategory, ItemJoinCategoryQuery, ItemQuery }
