module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'data_nascimento', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'data_nascimento'),
};
