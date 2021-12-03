import Sequelize, { Model } from 'sequelize';

class Comments extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        video_id: Sequelize.INTEGER,
        channel_id: Sequelize.INTEGER,
        comment: Sequelize.STRING,
        reply: Sequelize.BOOLEAN,
        reply_id: Sequelize.INTEGER,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Video, { foreignKey: 'video_id', as: 'video' });
    this.belongsTo(models.Channel, { foreignKey: 'channel_id', as: 'channel' });
  }
}

export default Comments;
