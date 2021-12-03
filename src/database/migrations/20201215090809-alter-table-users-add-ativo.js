module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'ativo', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'ativo'),
};
