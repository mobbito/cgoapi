module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('videos', 'views', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),

  down: (queryInterface) => queryInterface.removeColumn('videos', 'views'),
};
