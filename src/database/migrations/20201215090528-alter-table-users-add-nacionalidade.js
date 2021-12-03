module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'nacionalidade', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'nacionalidade'),
};
