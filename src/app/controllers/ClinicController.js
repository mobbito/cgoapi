import * as Yup from 'yup';

import Clinic from '../models/Clinic';
import File from '../models/File';

class ClinicController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      phone: Yup.string().required(),
      email: Yup.string().required(),
      cep: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails ${schema}` });
    }

    const {
      id,
      name,
      avatar_id,
      phone,
      email,
      cep,
      address,
      number,
      city,
      state,
      country,
    } = await Clinic.create(req.body);
    return res.json({
      id,
      name,
      avatar_id,
      phone,
      email,
      cep,
      address,
      number,
      city,
      state,
      country,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      phone: Yup.string().required(),
      email: Yup.string().required(),
      cep: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      active: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const clinic = await Clinic.findByPk(req.params.id);

    await clinic.update(req.body);
    const {
      id,
      name,
      avatar_id,
      phone,
      email,
      cep,
      address,
      number,
      city,
      state,
      country,
      active,
    } = await Clinic.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      avatar_id,
      phone,
      email,
      cep,
      address,
      number,
      city,
      state,
      country,
      active,
    });
  }

  async index(req, res) {
    const clinic = await Clinic.findAll({
      where: { active: true },
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(clinic);
  }
}

export default new ClinicController();
