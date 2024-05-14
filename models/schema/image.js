const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    imageURL: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imageURL2: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    imageURL3: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Images',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Images_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
