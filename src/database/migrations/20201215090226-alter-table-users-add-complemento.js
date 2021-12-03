module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'complemento', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'complemento'),
};
