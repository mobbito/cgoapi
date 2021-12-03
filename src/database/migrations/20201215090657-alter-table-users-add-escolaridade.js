module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'escolaridade', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'escolaridade'),
};
