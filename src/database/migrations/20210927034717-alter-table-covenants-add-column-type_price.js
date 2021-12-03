module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('covenants', 'type_price', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('covenants', 'type_price'),
};
