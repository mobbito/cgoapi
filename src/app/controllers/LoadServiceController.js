import Services from '../models/Services';

class LoadServiceController {
  async index(req, res) {
    const services = await Services.findAll({
      where: { id: req.params.serviceId },
    });

    return res.json(services);
  }
}

export default new LoadServiceController();
