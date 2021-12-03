module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('hours', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    }),
    queryInterface.addColumn('hours', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  ),

  down: (queryInterface) =>
    queryInterface.removeColumn('hours', 'created_at', 'updated_at'),
};
