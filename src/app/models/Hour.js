import Sequelize, { Model } from 'sequelize';

class Hour extends Model {
  static init(sequelize) {
    super.init(
      {
        hour: Sequelize.TIME,
        provider_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Hour;
