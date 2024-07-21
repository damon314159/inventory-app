export interface Item {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
}

export interface ItemQuery {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  category_id: number
  created_at: Date
  updated_at: Date
}
