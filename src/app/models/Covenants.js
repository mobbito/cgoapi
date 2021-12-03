import Sequelize, { Model } from 'sequelize';

class Covenants extends Model {
  static init(sequelize) {
    super.init(
      {
        clinic_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        public_key: Sequelize.STRING,
        secret_key: Sequelize.STRING,
        type_price: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Clinic, { foreignKey: 'clinic_id', as: 'clinic' });
  }
}

export default Covenants;
