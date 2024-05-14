const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation } = require('../../../_helpers')
const multer = require('multer')

const permittedParams = [
  'ProductId',
  'quantity',
]

const validation = [
  body('ProductId').isInt().notEmpty().withMessage('ProductID must be a String').withMessage('ProductID is Required'),
  body('quantity').isInt().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity is Required'),
]

const apiAddCartItem = async function(req, res) {
  const { body: productParams } = req
  const { locals: { currentUser } } = res

  await currentUser.createCart(productParams, {
    fields: permittedParams
  })

  res.json({ message: 'Item added to Cart'})
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken,
  validation,
  checkValidation,
  apiAddCartItem
]
