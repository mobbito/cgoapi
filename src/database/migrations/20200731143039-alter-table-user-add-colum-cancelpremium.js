module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'cancelpremium', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'cancelpremium'),
};
