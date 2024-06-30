export interface Item {
  id: number
  name: string
  description?: string
  url: string
  price: number
  stock: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
}
