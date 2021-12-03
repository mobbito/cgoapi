module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('videos', 'free', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }),

  down: (queryInterface) => queryInterface.removeColumn('videos', 'free'),
};
