const { Product } = require('../../../../../models')

module.exports = async function (req, res, next) {
  const { params: { id } } = req

  const product = await Product.findOne({
    where: { id: Number(id) || 0 },
  })

  if (!product) {
    return res.status(404).json({ message: `Product of ID ${id} not found!` })
  }

  res.locals.currentProduct = product

  next()
}
