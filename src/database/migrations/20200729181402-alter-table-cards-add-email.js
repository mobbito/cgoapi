module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('cards', 'email', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),

  down: (queryInterface) => queryInterface.removeColumn('cards', 'email'),
};
