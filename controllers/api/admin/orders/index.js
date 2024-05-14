const { authenticateCurrentUserByToken } = require('../../../_helpers')

const { Order } = require('../../../../models')

const pageOrdersIndex = async function (req, res) {
  const { query } = req
  const { locals: { currentUser } } = res

  if (!currentUser.isAdmin) {
    return res.json("Unauthorized access")
  }

  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1 ) * limit
  const order = []

  const orderAdminIndex = await Order.findAndCountAll({ // Count all is required for pagination
    order : [['createdAt', 'DESC']],
    limit,
    offset,
    include: [ // use [] if on the same line
      {
        association: Order.Products,
      }
    ]
  })

  res.status(200).json({
    orders: orderAdminIndex.rows,
    meta: { page, limit, offset, order, totalPages: Math.ceil(orderAdminIndex.count / limit) }
  })
}

module.exports = [
  authenticateCurrentUserByToken,
  pageOrdersIndex]
