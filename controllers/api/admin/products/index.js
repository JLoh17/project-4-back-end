const { Product } = require('../../../../models')
const authenticateCurrentUserByToken = require('../../../_helpers/authenticate-current-user-by-token')

const apiProductGetIndex = async function (req, res) {
  const { locals: { currentUser } } = res
  const { query } = req

    if (!currentUser.isAdmin) {
    return res.json("Unauthorized access")
  }

  const page = Number(query.page)|| 1
  const limit = 10
  const offset = (page - 1) * limit
  const sortField = query.sortField || 'createdAt'
  const sortOrder = query.sortOrder || 'DESC'

  const result = await Product.findAndCountAll({
    offset,
    limit,
    order: [[sortField, sortOrder]],
    include: [
      {
      association: Product.Category,
      }, {
      association: Product.Images
      }
    ]
  })

  return res.status(200).json({
    product: result.rows,
    meta: { page, limit, offset, totalPages: Math.ceil(result.count / limit)}
  })
}

module.exports = [authenticateCurrentUserByToken, apiProductGetIndex]
