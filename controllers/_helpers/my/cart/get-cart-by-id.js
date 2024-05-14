const { Cart } = require('../../../../models')

module.exports = async function (req, res, next) {
  const { params: { id } } = req

  const cart = await Cart.findOne({
    where: { id: Number(id) || 0 },
  })

  if (!cart) {
    return res.status(404).json({ message: `Cart of ID ${id} not found!` })
  }

  res.locals.currentCart = cart

  next()
}
