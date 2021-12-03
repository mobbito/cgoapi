module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'profissao', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'profissao'),
};
