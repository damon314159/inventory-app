import { validationResult } from 'express-validator'
import categoryService from '../services/CategoryService.js'
import type { Request, RequestHandler, Response } from 'express'

const categoryIndex: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    res.render('categories/index', {
      categories: await categoryService.readCategories({}),
    })
  } catch (err) {
    res.render('categories/index', { errors: [err] })
  }
}

const getCreateCategory: RequestHandler = (
  _req: Request,
  res: Response
): void => {
  res.render('categories/create')
}

const createCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/create', {
        errors: errors.array(),
        formData: { description, name },
      })
      return
    }

    await categoryService.createCategory({ description, name })
    res.render('categories/create', { success: true })
  } catch (err) {
    res.render('categories/create', { errors: [err] })
  }
}

const readCategories: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, description, createdAt, updatedAt } = req.query as Record<
      string,
      string | undefined
    > // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/index', {
        errors: errors.array(),
        searchValue: name,
      })
      return
    }

    const categories = await categoryService.readCategories({
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: id ? Number(id) : undefined,
      name,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    })
    res.render('categories/index', { categories, searchValue: name })
  } catch (err) {
    res.render('categories/index', { errors: [err] })
  }
}

const readCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, description, createdAt, updatedAt } = req.query as Record<
      string,
      string | undefined
    > // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/index', {
        errors: errors.array(),
        searchValue: name,
      })
      return
    }

    const category = await categoryService.readCategory({
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: id ? Number(id) : undefined,
      name,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    })
    res.render('categories/index', {
      categories: [category],
      searchValue: name,
    })
  } catch (err) {
    res.render('categories/index', { errors: [err] })
  }
}

const getUpdateCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/edit', { errors: errors.array(), id })
      return
    }

    const category = await categoryService.readCategory({ id: Number(id) })
    if (!category) {
      res.render('categories/edit', {
        errors: [new Error('No category found with this ID')],
        id,
      })
      return
    }

    res.render('categories/edit', {
      formData: { description: category.description, name: category.name },
      id,
      name: category.name,
    })
  } catch (err) {
    res.render('categories/edit', { errors: [err] })
  }
}

const updateCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    const errors = validationResult(req)
    if (errors.mapped().id) {
      res.render('categories/edit', {
        errors: [errors.mapped().id],
        formData: { description, name },
        id,
      })
      return
    }

    const category = await categoryService.readCategory({ id: Number(id) })
    if (!category) {
      res.render('categories/edit', {
        errors: [new Error('No category found with this ID')],
        id,
      })
      return
    }

    if (!errors.isEmpty()) {
      res.render('categories/edit', {
        errors: errors.array(),
        formData: { description, name },
        id,
        name: category.name,
      })
      return
    }

    await categoryService.updateCategory({
      data: { description, name },
      id: Number(id),
    })
    res.render('categories/edit', { success: true })
  } catch (err) {
    res.render('categories/edit', { errors: [err] })
  }
}

const getDeleteCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/delete', { errors: errors.array(), id })
      return
    }

    const category = await categoryService.readCategory({ id: Number(id) })
    if (!category) {
      res.render('categories/delete', {
        errors: [new Error('No category found with this ID')],
        id,
      })
      return
    }

    res.render('categories/delete', { id, name: category.name })
  } catch (err) {
    res.render('categories/delete', { errors: [err] })
  }
}

const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/delete', { errors: errors.array(), id })
      return
    }

    await categoryService.deleteCategory({ id: Number(id) })
    res.render('categories/delete', { success: true })
  } catch (err) {
    res.render('categories/delete', { errors: [err] })
  }
}

export {
  categoryIndex,
  createCategory,
  deleteCategory,
  getCreateCategory,
  getDeleteCategory,
  getUpdateCategory,
  readCategories,
  readCategory,
  updateCategory,
}
