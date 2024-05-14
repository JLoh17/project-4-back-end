const { Product } = require('../../../models')

const pageProductsShow = async function (req, res) {
  const { params: { id } } = req


  const productShow = await Product.findOne({
    where: {
      id: Number(id) || 0 ,
    },
    include: [ // use [] if on the same line
      {
        association: Product.Images
      }, {
        association: Product.Category
      }
    ]
  })

  if (!productShow) {
      return res.status(404).json({ message: `Product ID ${id} not found!` })
  }

  res.status(200).json({ product: productShow })
}

module.exports = [pageProductsShow]
