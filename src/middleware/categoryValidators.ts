import { body, param, query } from 'express-validator'
import type { ValidationChain } from 'express-validator'

// First, construct a set of base validators for each column in the category table
// Secondly, create optional variants of each column
// Lastly, for each route that needs validation, combine the appropriate set of base validators

// Base validators

const id = (location = body, field = 'id'): ValidationChain =>
  location(field)
    .escape()
    .exists({ checkFalsy: true, checkNull: true })
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

const validateCreateCategory: ValidationChain[] = [
  name(),
  descriptionOptional(),
]

// Read category and categories are the same structure, so we can abstract
const createValidateReadCategories = (): ValidationChain[] => [
  idOptional(query),
  nameOptional(query),
  descriptionOptional(query),
  createdAtOptional(query),
  updatedAtOptional(query),
]
const validateReadCategories = createValidateReadCategories()
const validateReadCategory = createValidateReadCategories()

const validateGetUpdateCategory: ValidationChain[] = [id(param)]
const validateUpdateCategory: ValidationChain[] = [
  id(param),
  nameOptional(body),
  descriptionOptional(body),
]

const validateGetDeleteCategory: ValidationChain[] = [id(param)]
const validateDeleteCategory: ValidationChain[] = [id(param)]

export {
  validateCreateCategory,
  validateDeleteCategory,
  validateGetDeleteCategory,
  validateGetUpdateCategory,
  validateReadCategories,
  validateReadCategory,
  validateUpdateCategory,
}
