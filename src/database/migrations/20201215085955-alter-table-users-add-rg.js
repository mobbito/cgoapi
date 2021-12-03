module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'rg', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'rg'),
};
