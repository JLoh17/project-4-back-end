'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'isDisabled', {type: Sequelize.BOOLEAN,  defaultValue: false});
    await queryInterface.changeColumn('Products', 'isNew', {type: Sequelize.BOOLEAN,  defaultValue: false});
    await queryInterface.changeColumn('Products', 'isFeature', {type: Sequelize.BOOLEAN,  defaultValue: false});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Product', 'isDisabled');
    await queryInterface.changeColumn('Product', 'isNew');
    await queryInterface.changeColumn('Product', 'isFeature');
  }
};
