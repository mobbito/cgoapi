import Sequelize, { Model } from 'sequelize';

class Video extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        channel_id: Sequelize.INTEGER,
        avatar_id: Sequelize.INTEGER,
        video_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        detach: Sequelize.BOOLEAN,
        views: Sequelize.INTEGER,
        free: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.File, { foreignKey: 'video_id', as: 'video' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Channel, { foreignKey: 'channel_id', as: 'channel' });
  }
}

export default Video;
