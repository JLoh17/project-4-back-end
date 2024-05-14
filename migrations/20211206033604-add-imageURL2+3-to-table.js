'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Images', 'imageURL2', {type: Sequelize.DataTypes.STRING(500),  allowNull: true});
    await queryInterface.addColumn('Images', 'imageURL3', {type: Sequelize.DataTypes.STRING(500),  allowNull: true});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Images', 'imageURL2');
    await queryInterface.removeColumn('Images', 'imageURL3');
  }
};
