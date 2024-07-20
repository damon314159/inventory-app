import { body } from 'express-validator'
import type { ValidationChain } from 'express-validator'

// First, construct a set of base validators for each column in the category table
// Secondly, create optional variants of each column
// Lastly, for each route that needs validation, combine the appropriate set of base validators

// Base validators

const id = (field = 'id'): ValidationChain =>
  body(field).escape().isInt({ gt: 0 })
const idOptional = (field = 'id'): ValidationChain => id(field).optional()

const name = (field = 'name'): ValidationChain =>
  body(field)
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters')
const nameOptional = (field = 'name'): ValidationChain =>
  body(field)
    .escape()
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters')

const description = (field = 'description'): ValidationChain =>
  body(field)
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 255 })
    .withMessage('Description must not exceed 255 characters')
const descriptionOptional = (field = 'description'): ValidationChain =>
  description(field).optional()

const url = (field = 'url'): ValidationChain =>
  body(field)
    .escape()
    .isString()
    .withMessage('URL must be a string')
    .notEmpty()
    .withMessage('URL cannot be empty')
    .isURL()
    .withMessage('URL must be a valid URL')
    .isLength({ max: 255 })
    .withMessage('URL must not exceed 255 characters')
const urlOptional = (field = 'url'): ValidationChain =>
  body(field)
    .escape()
    .optional()
    .isString()
    .withMessage('URL must be a string')
    .isURL()
    .withMessage('URL must be a valid URL')
    .isLength({ max: 255 })
    .withMessage('URL must not exceed 255 characters')

const createdAt = (field = 'createdAt'): ValidationChain =>
  body(field).escape().isDate()
const createdAtOptional = (field = 'createdAt'): ValidationChain =>
  createdAt(field).optional()

const updatedAt = (field = 'updatedAt'): ValidationChain =>
  body(field).escape().isDate()
const updatedAtOptional = (field = 'updatedAt'): ValidationChain =>
  updatedAt(field).optional()

// Route validators

const validateCreateCategory: ValidationChain[] = [
  name(),
  descriptionOptional(),
  url(),
]

// Read category and categories are the same structure, so we can abstract
const createValidateReadCategories = (): ValidationChain[] => [
  idOptional(),
  nameOptional(),
  descriptionOptional(),
  urlOptional(),
  createdAtOptional(),
  updatedAtOptional(),
]
const validateReadCategories = createValidateReadCategories()
const validateReadCategory = createValidateReadCategories()

const validateUpdateCategory: ValidationChain[] = [
  id(),
  nameOptional('data.name'),
  descriptionOptional('data.description'),
  urlOptional('data.url'),
]

const validateDeleteCategory: ValidationChain[] = [id()]

export {
  validateCreateCategory,
  validateDeleteCategory,
  validateReadCategories,
  validateReadCategory,
  validateUpdateCategory,
}
