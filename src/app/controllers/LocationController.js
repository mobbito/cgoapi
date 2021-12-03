import Location from '../models/Location';

class LocationController {
  async index(req, res) {
    const location = await Location.findAll({
      where: { activity: true },
    });

    return res.json(location);
  }
}

export default new LocationController();
