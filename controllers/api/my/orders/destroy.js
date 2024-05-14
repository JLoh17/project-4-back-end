const { Order } = require('../../../../models')

const orderDestroy = async function (req, res) {
  const { params: { id }, body } = req

  const order = await Order.findOne({
    where: {
      id: Number(id) || 0
    }
  })

  if (!order) {
    return res.status(404).json({ message: `Order ID ${id} not found!` })
  }

  await order.destroy(body)

  res.status(200).json({ order })
}

module.exports = [orderDestroy]
