module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'estado', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'estado'),
};
