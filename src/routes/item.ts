import { Router } from 'express'
import {
  createItem,
  deleteItem,
  getCreateItem,
  getDeleteItem,
  getUpdateItem,
  itemIndex,
  readItem,
  readItems,
  updateItem,
} from '../controllers/item.js'
import {
  validateCreateItem,
  validateDeleteItem,
  validateGetDeleteItem,
  validateGetUpdateItem,
  validateReadItem,
  validateReadItems,
  validateUpdateItem,
} from '../middleware/itemValidators.js'

// Instantiate a new router
const router = Router()

router.get('/', itemIndex)
router.get('/create', getCreateItem)
router.post('/create', validateCreateItem, createItem)
router.get('/find', validateReadItems, readItems)
router.get('/find-one', validateReadItem, readItem)
router.get('/edit/:id?', validateGetUpdateItem, getUpdateItem)
router.patch('/edit/:id?', validateUpdateItem, updateItem)
router.get('/delete/:id?', validateGetDeleteItem, getDeleteItem)
router.delete('/delete/:id?', validateDeleteItem, deleteItem)

export default router
