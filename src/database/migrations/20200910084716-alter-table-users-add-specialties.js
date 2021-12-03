module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'specialties', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'specialties'),
};
