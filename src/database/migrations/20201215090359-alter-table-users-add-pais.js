module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'pais', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'pais'),
};
