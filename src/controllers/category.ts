import { validationResult } from 'express-validator'
import categoryService from '../services/CategoryService.js'
import type { Request, Response } from 'express'

const createCategory = async (req: Request, res: Response): Promise<void> => {
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

const readCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id, name, description, url, createdAt, updatedAt } =
      req.query as Record<string, string> // This cast means that path?id=one&id=two will fail
    const categories = await categoryService.readCategories({
      createdAt: new Date(createdAt),
      description,
      id: Number(id),
      name,
      updatedAt: new Date(updatedAt),
      url,
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const readCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id, name, description, url, createdAt, updatedAt } =
      req.query as Record<string, string> // This cast means that path?id=one&id=two will fail
    const category = await categoryService.readCategory({
      createdAt: new Date(createdAt),
      description,
      id: Number(id),
      name,
      updatedAt: new Date(updatedAt),
      url,
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // TODO: render the form again with the errors and existing data
      return
    }

    const { id, data } = req.body
    const { name, description, url } = data ?? {}

    const category = await categoryService.updateCategory({
      data: { description, name, url },
      id,
    })
    // TODO: render some sort of success view
  } catch (err) {
    // TODO: render error view
  }
}

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
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
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
}
