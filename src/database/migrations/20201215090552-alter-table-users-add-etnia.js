module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'etnia', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'etnia'),
};
