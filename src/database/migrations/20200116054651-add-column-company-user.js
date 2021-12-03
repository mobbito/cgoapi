module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'company_id', {
      type: Sequelize.INTEGER,
      references: { model: 'companies', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'company_id'),
};
