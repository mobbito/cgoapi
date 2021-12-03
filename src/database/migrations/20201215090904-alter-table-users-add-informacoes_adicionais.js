module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'informacoes_adicionais', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'informacoes_adicionais'),
};
