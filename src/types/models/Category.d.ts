export interface Category {
  id: number
  name: string
  description?: string
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryQuery {
  id: number
  name: string
  description?: string
  url: string
  created_at: Date
  updated_at: Date
}
