module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'subscription_id', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'subscription_id'),
};
