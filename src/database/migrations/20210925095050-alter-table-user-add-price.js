module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'price', {
      type: Sequelize.FLOAT(11),
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'price'),
};
