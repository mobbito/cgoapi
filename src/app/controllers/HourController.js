import * as Yup from 'yup';

import Hour from '../models/Hour';

class HourController {
  async store(req, res) {
    const schema = Yup.object().shape({
      hour: Yup.string().required(),
      provider_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, hour, provider_id } = await Hour.create(req.body);
    return res.json({
      id,
      hour,
      provider_id,
    });
  }

  async index(req, res) {
    const hour = await Hour.findAll({
      where: { provider_id: req.params.providerId },
    });

    return res.json(hour);
  }
}

export default new HourController();
