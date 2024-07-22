import { Router } from 'express'
import { aboutController, indexController } from '../controllers/index.js'

// Instantiate a new router
const router = Router()

router.get('/', indexController)
router.get('/about', aboutController)

export default router
