import itemService from '../services/ItemService.js'
import type { Request, RequestHandler, Response } from 'express'

const indexController: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.render('index', {
    totalItems: (await itemService.readItems({})).length,
    totalLowStock: (await itemService.readItems({})).filter(
      (item): boolean => item.stock < 20
    ).length,
  })
}

const aboutController: RequestHandler = (
  _req: Request,
  res: Response
): void => {
  res.render('about')
}

export { aboutController, indexController }
