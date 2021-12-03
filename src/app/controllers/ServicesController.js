import * as Yup from 'yup';

import Services from '../models/Services';

class ServicesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().required(),
      provider_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, price, provider_id } = await Services.create(req.body);
    return res.json({
      id,
      name,
      price,
      provider_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const service = await Services.findByPk(req.params.serviceId);

    // const { id, name, provider } = await user.update(req.body);
    await service.update(req.body);
    const { id, name, price, provider_id } = await Services.findByPk(
      req.params.serviceId
    );
    return res.json({
      id,
      name,
      price,
      provider_id,
    });
  }

  async index(req, res) {
    const services = await Services.findAll({
      where: { provider_id: req.params.providerId },
    });

    return res.json(services);
  }
}

export default new ServicesController();
