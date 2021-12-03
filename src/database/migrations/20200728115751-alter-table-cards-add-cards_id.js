module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('cards', 'cards_id', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),

  down: (queryInterface) => queryInterface.removeColumn('cards', 'cards_id'),
};
