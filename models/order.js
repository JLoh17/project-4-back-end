'use strict';
const { Model } = require('sequelize');
const OrderSchema = require ('./schema/order')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.User = this.belongsTo(models.User)
      Order.OrderProducts = this.hasMany(models.OrderProduct)
      Order.Products = this.belongsToMany(models.Product, {through: 'OrderProduct'})
      Order.Point = this.hasOne(models.Point)
    }
  };

  const { tableAttributes } = OrderSchema (sequelize, DataTypes)
  Order.init(tableAttributes, {
    hooks: {
      afterSave: async (instance) => {
        if (instance._options.isNewRecord) {
          const user = await instance.getUser()
          await user.createPoint({
            OrderId: instance.id,
            // points: instance.pointsGain - instance.pointsUsed
            points: instance.points
          })
        }

        if (instance.status === 'Cancelled') {
          const point = await instance.getPoint()
          if (point) {
            await point.destroy()
          }
        }
      }
    },
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
