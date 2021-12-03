module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('covenants', 'secret_key', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('covenants', 'secret_key'),
};
