module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'cns', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'cns'),
};
