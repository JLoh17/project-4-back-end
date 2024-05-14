const { Point, Order } = require('./models')
const sequelize = require("sequelize")

const test = async () => {
  const points = await Point.findAll({
    where: {
      UserId: 1
    },
    attributes: [
      'UserId',
      [sequelize.fn('SUM', sequelize.col('points')), 'pointsBalance']
    ],
    group: ['UserId']
  })

  console.log(">>>")
  console.log(points)
  console.log(">>>")
  console.log(points[0])
  console.log(">>>")
  console.log(points[0].dataValues)
  console.log(">>>")
  console.log(points[0].dataValues.pointsBalance)
  console.log(">>>")
  console.log(points[0].UserId)
}

// test()

const test2 = async () => {
  const points = await Point.create({
    UserId: 1,
    OrderId: 4,
    points: 1000
  })

  console.log(points)
}

// test2()

const test3 = async () => {
  const point = await Point.findOne()

  await point.update({ points: 100 })

  console.log(point)
}

// test3()

const test4 = async () => {
  const order = await Order.create({
    points: 40,
    grandTotal: 1000,
    status: 'Pending Payment',
    UserId: 1
  })
}

// test4()

const test5 = async () => {
  const order = await Order.findOne()
  await order.update({ status: 'Canceled'})
}

test5()
