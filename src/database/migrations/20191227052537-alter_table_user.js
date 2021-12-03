module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'location', {
      type: Sequelize.INTEGER,
      references: { model: 'locations', key: 'id' },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'location'),
};
