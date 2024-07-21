import { Router } from 'express'
import {
  categoryIndex,
  createCategory,
  deleteCategory,
  getCreateCategory,
  getUpdateCategory,
  readCategories,
  readCategory,
  updateCategory,
} from '../controllers/category.js'
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateGetUpdateCategory,
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
router.get('/edit/:id', validateGetUpdateCategory, getUpdateCategory)
router.patch('/edit/:id', validateUpdateCategory, updateCategory)
router.delete('/delete/:id', validateDeleteCategory, deleteCategory)

export default router
