module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'numero', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'numero'),
};
