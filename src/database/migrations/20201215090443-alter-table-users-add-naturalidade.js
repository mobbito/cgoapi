module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'naturalidade', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'naturalidade'),
};
