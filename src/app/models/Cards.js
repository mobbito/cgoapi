import Sequelize, { Model } from 'sequelize';

class Cards extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        operadora: Sequelize.STRING,
        numerocartao: Sequelize.STRING,
        titular: Sequelize.STRING,
        validade: Sequelize.STRING,
        cpftitular: Sequelize.STRING,
        cep: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        cidade: Sequelize.STRING,
        uf: Sequelize.STRING,
        principal: Sequelize.STRING,
        costumer_id: Sequelize.STRING,
        cards_id: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Cards;
