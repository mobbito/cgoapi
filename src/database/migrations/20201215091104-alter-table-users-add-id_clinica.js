module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'id_clinica', {
      type: Sequelize.INTEGER,
      references: { model: 'clinics', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'id_clinica'),
};
