module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'activitypremium', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'activitypremium'),
};
