const { authenticateCurrentUserByToken, product: { getProductByID } } = require('../../../_helpers')

const productDestroy = async function(req, res) {
  const { locals: { currentProduct } } = res

  await currentProduct.destroy()
  res.status(204).json()
}

module.exports = [
  authenticateCurrentUserByToken,
  getProductByID,
  productDestroy
]
