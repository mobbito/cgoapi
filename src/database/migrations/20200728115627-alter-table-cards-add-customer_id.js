module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('cards', 'costumer_id', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),

  down: (queryInterface) => queryInterface.removeColumn('cards', 'costumer_id'),
};
