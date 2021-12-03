module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('appointments', 'covenants_id', {
      type: Sequelize.INTEGER,
      references: { model: 'covenants', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('appointments', 'covenants_id'),
};
