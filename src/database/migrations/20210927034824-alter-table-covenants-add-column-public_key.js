module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('covenants', 'public_key', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('covenants', 'public_key'),
};
