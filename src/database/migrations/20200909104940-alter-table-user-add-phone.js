module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'phone'),
};
