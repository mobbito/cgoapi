module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'telefone_casa', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'telefone_casa'),
};
