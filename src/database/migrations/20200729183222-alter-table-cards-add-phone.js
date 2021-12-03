module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('cards', 'phone', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),

  down: (queryInterface) => queryInterface.removeColumn('cards', 'phone'),
};
