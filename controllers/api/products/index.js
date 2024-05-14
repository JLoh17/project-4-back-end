const { Op } = require("sequelize");
const { Product, Category } = require('../../../models')

// /api/products?isFeatured=true
const pageProductsIndex = async function (req, res) {
  const { query } = req

  const q = query.q || ''
  // const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 12
  const offset = (page - 1 ) * limit
  const CategoryId = Number(query.catName) || 0
  const isFeature = query.isFeature || ''
  const isNew = query.isNew || ''

  // let order = []
  // if (sort === 'productName') {
  //   order.push (['productName', 'ASC'])
  // } else if (sort === 'Price') {
  //   order.push (['Price', 'DESC'])
  // } else {
  //   order.push([sort, 'DESC'])
  // }

  let where = {
    productName: {
      [Op.iLike]: `%${q}%`
    }
  }

  let catName = ''
  if (CategoryId > 0) {
    where.CategoryId = CategoryId
    const category = await Category.findByPk(CategoryId)
    catName = category.catName
  }

  if (isFeature) {
    where.isFeature = true // this gets added to the where query above
  }

  if (isNew) {
    where.isNew = true
  }

  const results = await Product.findAndCountAll({
    where,
    order: [
      ['createdAt', 'DESC']
    ],
    limit,
    offset,
    include: [ // use [] if on the same line
      {
        association: Product.Images
      }, {
        association: Product.Category
      }
    ]
  })

  return res.status(200).json({
    product: results.rows,
    meta: { q, page, limit, offset, totalPages: Math.ceil(results.count / limit), catName }
  })
}

module.exports = [pageProductsIndex]
