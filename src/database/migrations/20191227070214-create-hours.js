module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('hours', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      hour: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('hours'),
};
