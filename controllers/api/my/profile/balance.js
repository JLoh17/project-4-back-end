const { authenticateCurrentUserByToken } = require('../../../_helpers')


const { Point } = require('../../../../models')

const pagePointsIndex = async function (req, res) {
  const { query } = req
  const { locals: { currentUser } } = res

  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1 ) * limit
  const order = []


  const pointBalanceIndex = await Point.findAndCountAll({
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
        association: Point.Order
      }
    ]
  })

  res.status(200).json({
    order: pointBalanceIndex.rows,
    meta: { page, limit, offset, order, totalPages: Math.ceil(pointBalanceIndex.count / limit) }
  })
}

module.exports = [
  authenticateCurrentUserByToken,
  pagePointsIndex]
