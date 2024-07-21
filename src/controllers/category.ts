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
      errors: null,
      searchValue: '',
    })
  } catch (err) {
    res.render('categories/index', {
      categories: null,
      errors: [err],
      searchValue: '',
    })
  }
}

const getCreateCategory: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('categories/create', {
    errors: null,
    formData: { description: '', name: '' },
    success: false,
  })
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
        errors,
        formData: { description, name },
        success: false,
      })
      return
    }

    await categoryService.createCategory({ description, name })
    res.render('categories/create', {
      errors: null,
      formData: { description: '', name: '' },
      success: true,
    })
  } catch (err) {
    res.render('categories/create', {
      errors: [err],
      formData: { description: '', name: '' },
      success: false,
    })
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
        categories: null,
        errors,
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
    const { id, name, description, createdAt, updatedAt } = req.query as Record<
      string,
      string | undefined
    > // This cast means that path?id=one&id=two will fail

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('categories/index', {
        categories: null,
        errors,
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
    const { name, description } = data ?? {}

    const category = await categoryService.updateCategory({
      data: { description, name },
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
  getCreateCategory,
  readCategories,
  readCategory,
  updateCategory,
}
