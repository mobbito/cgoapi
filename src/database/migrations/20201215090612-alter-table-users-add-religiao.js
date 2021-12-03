module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'religiao', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'religiao'),
};
