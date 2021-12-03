module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'estado_civil', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'estado_civil'),
};
