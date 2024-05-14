'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'stripeId', {type: Sequelize.STRING});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'stripeId', {type: Sequelize.INTEGER});

  }
};
