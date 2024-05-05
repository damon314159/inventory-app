import express, { type RequestHandler } from 'express'

// Instantiate a new router
const router = express.Router()

/* GET users listing. */
const indexController: RequestHandler = (_req, res): void => {
  res.send('respond with a resource')
}
router.get('/', indexController)

export default router
