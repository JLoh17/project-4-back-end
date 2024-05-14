const { authenticateCurrentUserByToken } = require('../../../_helpers')

const { Order } = require('../../../../models')

const pageOrdersIndex = async function (req, res) {
  const { query } = req
  const { locals: { currentUser } } = res

  const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1 ) * limit
  const order = []


  const orderNewIndex = await Order.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order : [
      ['createdAt', 'DESC']
    ],
    limit,
    offset,
    include: [ // use [] if on the same line
      {
        association: Order.Products
      }
    ]
  })

  res.status(200).json({
    order: orderNewIndex.rows,
    meta: { page, limit, offset, order, totalPages: Math.ceil(orderNewIndex.count / limit) }
  })
}

module.exports = [
  authenticateCurrentUserByToken,
  pageOrdersIndex]
