import { Router } from 'express'
import {
  categoryIndex,
  createCategory,
  deleteCategory,
  getCreateCategory,
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

router.get('/', categoryIndex)
router.get('/create', getCreateCategory)
router.post('/create', validateCreateCategory, createCategory)
router.get('/find', validateReadCategories, readCategories)
router.get('/find-one', validateReadCategory, readCategory)
router.patch('/update/:id', validateUpdateCategory, updateCategory)
router.delete('/delete/:id', validateDeleteCategory, deleteCategory)

export default router
