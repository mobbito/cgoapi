module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('hours', 'date', {
      type: Sequelize.DATE,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('hours', 'date'),
};
