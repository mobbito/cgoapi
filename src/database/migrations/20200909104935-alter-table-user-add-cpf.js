module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'cpf', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'cpf'),
};
