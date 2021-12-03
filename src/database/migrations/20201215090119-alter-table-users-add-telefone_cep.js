module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'cep', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'cep'),
};
