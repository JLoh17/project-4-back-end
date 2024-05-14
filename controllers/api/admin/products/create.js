const multer = require('multer')

const { authenticateCurrentUserByToken, checkValidation } = require('../../../_helpers')
const { Product } = require('../../../../models')

const permittedParams = [
  'productName',
  'CategoryId',
  'price',
  'description',
  'isNew',
  'isFeature',
  'isDisabled',
  'Images.*.imageURL', // * is an array
  'Images.*.imageURL2', // * is an array
  'Images.*.imageURL3', // * is an array
]

// const validation = [
//   body('Product')
//     .isString().withMessage('Product name must be a String')
//     .notEmpty().withMessage('Product name is Required'),
//   body('CategoryId')
//     .toInt().isInt({ min: 1, max: 4 }).withMessage('Category must be between 1 and 4'),
//   body('p')
//     .toIdt().isInt({ min: 1, max: 99999 }).withMessage('Category must be between 1 and 4'),
//   body('Description')
//     .isString().withMessage('Description must be a String')
//     .notEmpty().withMessage('Description is Required')
//     .isLength({ max: 500 }).withMessage('Character limit is 500, please reduce the number of characters'),
//   body('Image')
//     .notEmpty().withMessage('Image is Required')

// ]

const apiProductCreate = async function(req, res) {
  const { locals: { currentUser } } = res
    const { body: productParams } = req

  if (!currentUser.isAdmin) {
    return res.json("Unauthorized access")
  }

  const newProduct = await Product.create({
    ...productParams,
  }, {
    fields: permittedParams,
    include: {
      association: Product.Images,
    },
  })

  // Another way of doing it
  // const newProduct = await Product.create(productParams, {
  //   fields: permittedParams
  // })

  // const length = productParams?.Images?.length || 0
  // for (let i = 0; i < length; i++) {
  //   const image = productParams?.Images[i]

  //   await newProduct.createImage(image)
  // }

  res.json({ product: newProduct })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken,
  // validation,
  checkValidation,
  apiProductCreate
]
