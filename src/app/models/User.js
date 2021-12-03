import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        company_id: Sequelize.STRING,
        specialties: Sequelize.STRING,
        registers: Sequelize.STRING,
        about: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
        data_nascimento: Sequelize.STRING,
        rg: Sequelize.STRING,
        telefone_casa: Sequelize.STRING,
        telefone_trabalho: Sequelize.STRING,
        cep: Sequelize.STRING,
        endereco: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        pais: Sequelize.STRING,
        naturalidade: Sequelize.STRING,
        naturalidade_estado: Sequelize.STRING,
        nacionalidade: Sequelize.STRING,
        etnia: Sequelize.STRING,
        religiao: Sequelize.STRING,
        estado_civil: Sequelize.STRING,
        escolaridade: Sequelize.STRING,
        profissao: Sequelize.STRING,
        obito: Sequelize.BOOLEAN,
        ativo: Sequelize.BOOLEAN,
        cns: Sequelize.STRING,
        informacoes_adicionais: Sequelize.STRING,
        id_clinica: Sequelize.STRING,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }

  ckeckPassord(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
