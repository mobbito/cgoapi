module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'telefone_trabalho', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'telefone_trabalho'),
};
