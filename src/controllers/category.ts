import { validationResult } from 'express-validator'
import categoryService from '../services/CategoryService.js'
import type { Request, RequestHandler, Response } from 'express'

const categoryIndex: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.render('categories/index', {
    categories: await categoryService.readCategories({}),
    errors: null,
    searchValue: '',
  })
}

const createCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { name, description, url } = req.body
    const category = await categoryService.createCategory({
      description,
      name,
      url,
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const readCategories: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, description, url, createdAt, updatedAt } =
      req.query as Record<string, string | undefined> // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/index', {
        categories: null,
        errors,
        searchValue: name,
      })
      return
    }

    const categories = await categoryService.readCategories({
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: Number(id),
      name,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      url,
    })
    res.render('categories/index', {
      categories,
      errors: null,
      searchValue: name,
    })
  } catch (err) {
    res.render('categories/index', {
      categories: null,
      errors: [err],
      searchValue: '',
    })
  }
}

const readCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id, name, description, url, createdAt, updatedAt } =
      req.query as Record<string, string | undefined> // This cast means that path?id=one&id=two will fail
    const category = await categoryService.readCategory({
      createdAt: createdAt ? new Date(createdAt) : undefined,
      description,
      id: Number(id),
      name,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      url,
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const updateCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id } = req.params
    const { data } = req.body
    const { name, description, url } = data ?? {}

    const category = await categoryService.updateCategory({
      data: { description, name, url },
      id: Number(id),
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id } = req.params
    await categoryService.deleteCategory({ id: Number(id) })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

export {
  categoryIndex,
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
}
