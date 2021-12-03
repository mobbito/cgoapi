module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('appointments', 'informations', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('appointments', 'informations'),
};
