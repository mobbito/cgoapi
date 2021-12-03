module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('videos', 'video_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('videos', 'video_id'),
};
