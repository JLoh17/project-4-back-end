const { Cart, Order } = require('../../../../models')

const { authenticateCurrentUserByToken, checkValidation } = require('../../../_helpers')
const multer = require('multer')

// const permittedParams = [
//   'deliveryAddress',
//   'firstName',
//   'lastName',
//   'grandTotal',
//   'telephone',
//   'status',
//   'UserId'
// ]

const apiCreateNewOrderProduct = async function(req, res) {
  const { locals: { currentUser } } = res

  const carts = await Cart.findAll({
    where: {
      UserId: currentUser.id
    },
    raw: true,
    attributes: ['ProductId', 'quantity']
  })

  const order = await Order.create({
    points: req.body.points,
    grandTotal: req.body.grandTotal,
    status: 'Pending Payment',
    UserId: currentUser.id,
    OrderProducts: carts
  }, {
    include: {
      association: Order.OrderProducts
    }
  })

  await Cart.destroy({ where: { UserId: currentUser.id }})

  res.status(201).json({ myOrder: order })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken,
  apiCreateNewOrderProduct
]
