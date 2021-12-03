module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'about', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'about'),
};
