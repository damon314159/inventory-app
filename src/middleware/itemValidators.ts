import { body, param, query } from 'express-validator'
import type { ValidationChain } from 'express-validator'

// First, construct a set of base validators for each column in the item table
// Secondly, create optional variants of each column
// Lastly, for each route that needs validation, combine the appropriate set of base validators

// Base validators

const id = (location = body, field = 'id'): ValidationChain =>
  location(field)
    .escape()
    .exists({ values: 'falsy' })
    .withMessage('ID must be provided')
    .isInt({ gt: 0 })
    .withMessage('ID must be an integer greater than 0')
const idOptional = (location = body, field = 'id'): ValidationChain =>
  id(location, field).optional()

const name = (location = body, field = 'name'): ValidationChain =>
  location(field)
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters')
const nameOptional = (location = body, field = 'name'): ValidationChain =>
  location(field)
    .escape()
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters')

const description = (location = body, field = 'description'): ValidationChain =>
  location(field)
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 255 })
    .withMessage('Description must not exceed 255 characters')
const descriptionOptional = (
  location = body,
  field = 'description'
): ValidationChain => description(location, field).optional()

const price = (location = body, field = 'price'): ValidationChain =>
  location(field)
    .escape()
    .exists({ values: 'null' })
    .withMessage('Price must be provided')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0')
const priceOptional = (location = body, field = 'price'): ValidationChain =>
  price(location, field).optional()

const stock = (location = body, field = 'stock'): ValidationChain =>
  location(field)
    .escape()
    .exists({ values: 'null' })
    .withMessage('Stock must be provided')
    .isInt({ min: 0 })
    .withMessage('Stock must be an integer greater than or equal to 0')
const stockOptional = (location = body, field = 'stock'): ValidationChain =>
  stock(location, field).optional()

const categoryId = (location = body, field = 'categoryId'): ValidationChain =>
  location(field)
    .escape()
    .exists({ values: 'falsy' })
    .withMessage('Category ID must be provided')
    .isInt({ gt: 0 })
    .withMessage('Category ID must be an integer greater than 0')
const categoryIdOptional = (
  location = body,
  field = 'categoryId'
): ValidationChain => categoryId(location, field).optional({ values: 'falsy' })

const createdAt = (location = body, field = 'createdAt'): ValidationChain =>
  location(field).escape().isDate()
const createdAtOptional = (
  location = body,
  field = 'createdAt'
): ValidationChain => createdAt(location, field).optional()

const updatedAt = (location = body, field = 'updatedAt'): ValidationChain =>
  location(field).escape().isDate()
const updatedAtOptional = (
  location = body,
  field = 'updatedAt'
): ValidationChain => updatedAt(location, field).optional()

// Route validators

const validateCreateItem: ValidationChain[] = [
  name(),
  descriptionOptional(),
  price(),
  stock(),
  categoryId(),
]

// Read item and items are the same structure, so we can abstract
const createValidateReadItems = (): ValidationChain[] => [
  idOptional(query),
  nameOptional(query),
  descriptionOptional(query),
  priceOptional(query),
  stockOptional(query),
  categoryIdOptional(query, 'category-id'),
  createdAtOptional(query, 'created-at'),
  updatedAtOptional(query, 'updated-at'),
]
const validateReadItems = createValidateReadItems()
const validateReadItem = createValidateReadItems()

const validateGetUpdateItem: ValidationChain[] = [id(param)]
const validateUpdateItem: ValidationChain[] = [
  id(param),
  nameOptional(),
  descriptionOptional(),
  priceOptional(),
  stockOptional(),
  categoryIdOptional(),
]

const validateGetDeleteItem: ValidationChain[] = [id(param)]
const validateDeleteItem: ValidationChain[] = [id(param)]

export {
  validateCreateItem,
  validateDeleteItem,
  validateGetDeleteItem,
  validateGetUpdateItem,
  validateReadItem,
  validateReadItems,
  validateUpdateItem,
}
