import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
} from '../controllers/category.js'
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateReadCategories,
  validateReadCategory,
  validateUpdateCategory,
} from '../middleware/categoryValidators.js'

// Instantiate a new router
const router = Router()

router.post('/create', validateCreateCategory, createCategory)
router.get('/read-many', validateReadCategories, readCategories)
router.get('/read', validateReadCategory, readCategory)
router.patch('/update/:id', validateUpdateCategory, updateCategory)
router.delete('/delete/:id', validateDeleteCategory, deleteCategory)

export default router
