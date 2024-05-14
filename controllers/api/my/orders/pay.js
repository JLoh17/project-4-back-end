const stripe = require('stripe')('sk_test_51K3KFzCuNAS6x1wu9AbtiH1rQ8ZHCj0gvGBQzAaEkERo7HnfuxEQl6W3czYSUAqjKNiO3SRPUy287AsASFXJS9f000m9wbFZkP')
const { Order, OrderProduct } = require('../../../../models')

const orderUpdate = async function (req, res) {
  // Find the order first
  const { params: { id }, body: { pointsUsed, ...values } } = req
  const order = await Order.findOne({
    where: { id: Number(id) || 0 },
    include: {
      association: Order.OrderProducts,
      include: {
        association: OrderProduct.Product
      }
    }
  })
  if (!order) return res.status(404).json({ message: `Order ID ${id} not found!` })

  // Going to the payment page
  // This is done first because we need to save the stripeId in the orders
  const lineItems = order.OrderProducts.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: 'hkd',
      product_data: {
        name: item.Product.productName
      },
      unit_amount: item.Product.price * 100
    }
  }))

  let coupon
  if (pointsUsed > 0) {
    coupon = await stripe.coupons.create({ amount_off: (pointsUsed / 5 * 100), currency: 'hkd',duration: 'once', name: 'Points Usage' });
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    discounts: coupon ? [{ coupon: coupon.id }] : [],
    success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/payment-cancelled`,
  });

  // Saving the order
  await order.update({
    ...values,
    status: 'Pending Delivery',
    stripeId: session.id
  })

  res.status(200).json(session);
}

module.exports = [orderUpdate]
