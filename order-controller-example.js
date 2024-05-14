// Step by step
const order = await Order.create({
  points: req.body.points,
  grandTotal: req.body.grandTotal,
  status: 'Pending Payment',
  UserId: currentUser.id
})

const carts = await Cart.findAll({
  where: {
    UserId: currentUser.id
  },
  attributes: ['ProductId', 'quantity']
})

for (let i = 0; i < carts.length; i += 1) {
  await order.createOrderProducts(carts[i].toJSON())
}

// Using Includes
const carts = await Cart.findAll({
  where: {
    UserId: currentUser.id
  },
  attributes: ['ProductId', 'quantity']
})


const order = await Order.create({
  points: req.body.points,
  grandTotal: req.body.grandTotal,
  status: 'Pending Payment',
  UserId: currentUser.id,
  OrderProducts: carts.toJSON()
}, {
  includes: {
    association: Order.OrderProducts
  }
})

res.status(201).json({ myOrder: order })
