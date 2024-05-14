const { authenticateCurrentUserByToken, cart: { getCartByID } } = require('../../../_helpers')

const orderItemDestroy = async function(req, res) {
  const { locals: { currentCart } } = res

  await currentCart.destroy()
  res.status(204).json()
}

module.exports = [
  authenticateCurrentUserByToken,
  getCartByID,
  orderItemDestroy
]
