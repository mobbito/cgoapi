module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'premium', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'premium'),
};
