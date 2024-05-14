'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(500)
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
      },
      isNew: {
        type: Sequelize.BOOLEAN,
      },
      isFeature: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
