import { validationResult } from 'express-validator'
import itemService from '../services/ItemService.js'
import type { Request, RequestHandler, Response } from 'express'

const itemIndex: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    res.render('items/index', {
      items: await itemService.readItems({}),
    })
  } catch (err) {
    res.render('items/index', { errors: [err] })
  }
}

const getCreateItem: RequestHandler = (_req: Request, res: Response): void => {
  res.render('items/create')
}

const createItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId, description, name, price, stock } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/create', {
        errors: errors.array(),
        formData: { categoryId, description, name, price, stock },
      })
      return
    }

    await itemService.createItem({
      categoryId,
      description,
      name,
      price,
      stock,
    })
    res.render('items/create', { success: true })
  } catch (err) {
    res.render('items/create', { errors: [err] })
  }
}

const readItems: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      name,
      description,
      price,
      stock,
      'category-id': categoryId,
      'created-at': createdAt,
      'updated-at': updatedAt,
    } = req.query as Record<string, string | undefined> // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/index', {
        errors: errors.array(),
        searchValue: name,
      })
      return
    }

    const items = await itemService.readItems({
      categoryId: categoryId ? Number(categoryId) : undefined,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: id ? Number(id) : undefined,
      name,
      price: price ? Number(price) : undefined,
      stock: stock ? Number(stock) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    })
    res.render('items/index', { items, searchValue: name })
  } catch (err) {
    res.render('items/index', { errors: [err] })
  }
}

const readItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      name,
      description,
      price,
      stock,
      'category-id': categoryId,
      'created-at': createdAt,
      'updated-at': updatedAt,
    } = req.query as Record<string, string | undefined> // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/index', {
        errors: errors.array(),
        searchValue: name,
      })
      return
    }

    const item = await itemService.readItem({
      categoryId: categoryId ? Number(categoryId) : undefined,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: id ? Number(id) : undefined,
      name,
      price: price ? Number(price) : undefined,
      stock: stock ? Number(stock) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    })
    res.render('items/index', { items: [item], searchValue: name })
  } catch (err) {
    res.render('items/index', { errors: [err] })
  }
}

const getUpdateItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/edit', { errors: errors.array(), id })
      return
    }

    const item = await itemService.readItem({ id: Number(id) })
    if (!item) {
      res.render('items/edit', {
        errors: [new Error('No item found with this ID')],
        id,
      })
      return
    }
    const { categoryId, description, name, price, stock } = item

    res.render('items/edit', {
      formData: { categoryId, description, name, price, stock },
      id,
      name,
    })
  } catch (err) {
    res.render('items/edit', { errors: [err] })
  }
}

const updateItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const { categoryId, description, name, price, stock } = req.body

    const errors = validationResult(req)
    if (errors.mapped().id) {
      res.render('items/edit', {
        errors: [errors.mapped().id],
        formData: { categoryId, description, name, price, stock },
        id,
      })
      return
    }

    const item = await itemService.readItem({ id: Number(id) })
    if (!item) {
      res.render('items/edit', {
        errors: [new Error('No item found with this ID')],
        id,
      })
      return
    }

    if (!errors.isEmpty()) {
      res.render('items/edit', {
        errors: errors.array(),
        formData: { categoryId, description, name, price, stock },
        id,
        name: item.name,
      })
      return
    }

    await itemService.updateItem({
      data: { categoryId, description, name, price, stock },
      id: Number(id),
    })
    res.render('items/edit', { success: true })
  } catch (err) {
    res.render('items/edit', { errors: [err] })
  }
}

const getDeleteItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/delete', { errors: errors.array(), id })
      return
    }

    const item = await itemService.readItem({ id: Number(id) })
    if (!item) {
      res.render('items/delete', {
        errors: [new Error('No item found with this ID')],
        id,
      })
      return
    }

    res.render('items/delete', { id, name: item.name })
  } catch (err) {
    res.render('items/delete', { errors: [err] })
  }
}

const deleteItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('items/delete', { errors: errors.array(), id })
      return
    }

    await itemService.deleteItem({ id: Number(id) })
    res.render('items/delete', { success: true })
  } catch (err) {
    res.render('items/delete', { errors: [err] })
  }
}

export {
  createItem,
  deleteItem,
  getCreateItem,
  getDeleteItem,
  getUpdateItem,
  itemIndex,
  readItem,
  readItems,
  updateItem,
}
