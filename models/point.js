'use strict';
const { Model } = require('sequelize');
const PointSchema = require('./schema/point')

module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      Point.User = this.belongsTo(models.User)
      Point.Order = this.belongsTo(models.Order)
    }
  };

  const updatePoints = async (instance) => {
    const pointsEntries = await Point.findAll({
      where: {
        UserId: instance.UserId
      },
      attributes: [
        'UserId',
        [sequelize.fn('SUM', sequelize.col('points')), 'pointsBalance']
      ],
      group: ['UserId']
    })

    const user = await instance.getUser()
    if (pointsEntries.length > 0) {
      await user.update({ pointsBalance: Number(pointsEntries[0].dataValues.pointsBalance) })
    } else {
      await user.update({ pointsBalance: 0 })
    }
  }

  const { tableAttributes } = PointSchema (sequelize, DataTypes)
  Point.init(tableAttributes, {
    hooks: {
      afterSave: updatePoints,
      afterDestroy: updatePoints
    },
    sequelize,
    modelName: 'Point',
  });

  return Point;
};
