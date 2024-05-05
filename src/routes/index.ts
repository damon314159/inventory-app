import express, { type RequestHandler } from 'express'

// Instantiate a new router
const router = express.Router()

/* GET home page. */
const indexController: RequestHandler = (_req, res): void => {
  res.render('index', { title: 'Express' })
}
router.get('/', indexController)

export default router
