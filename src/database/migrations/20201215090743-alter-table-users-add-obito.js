module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'obito', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'obito'),
};
