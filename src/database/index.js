import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Location from '../app/models/Location';
import Hour from '../app/models/Hour';
import Company from '../app/models/Company';
import Services from '../app/models/Services';
import Channel from '../app/models/Channel';
import Video from '../app/models/Video';
import Comments from '../app/models/Comments';
import Like from '../app/models/Like';
import Cards from '../app/models/Cards';
import Clinic from '../app/models/Clinic';
import Covenants from '../app/models/Covenants';
import Procedures from '../app/models/Procedures';

import databaseConfig from '../config/database';

const models = [
  User,
  File,
  Appointment,
  Location,
  Hour,
  Company,
  Services,
  Channel,
  Video,
  Comments,
  Like,
  Cards,
  Clinic,
  Covenants,
  Procedures,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
