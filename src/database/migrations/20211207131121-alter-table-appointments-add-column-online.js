module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('appointments', 'online', {
      type: Sequelize.BOOLEAN,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
      defaulValue: false,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('appointments', 'online'),
};
