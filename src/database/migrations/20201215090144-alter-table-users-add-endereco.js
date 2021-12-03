module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'endereco', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'endereco'),
};
