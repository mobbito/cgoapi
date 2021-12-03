module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'naturalidade_estado', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'naturalidade_estado'),
};
