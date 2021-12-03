module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'registers', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'registers'),
};
