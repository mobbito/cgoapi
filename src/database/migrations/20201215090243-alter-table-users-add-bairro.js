module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'bairro', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'bairro'),
};
