module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'cidade', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'cidade'),
};
