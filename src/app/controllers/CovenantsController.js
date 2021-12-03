import * as Yup from 'yup';

import Covenants from '../models/Covenants';
import Clinic from '../models/Clinic';
import File from '../models/File';

class CovenantsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      clinic_id: Yup.string().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails ${schema}` });
    }

    const { id, clinic_id, name, avatar_id, description } =
      await Covenants.create(req.body);
    return res.json({
      id,
      clinic_id,
      name,
      avatar_id,
      description,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      clinic_id: Yup.string().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      description: Yup.string().required(),
      active: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const covenants = await Covenants.findByPk(req.params.id);

    await covenants.update(req.body);
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
    } = await Covenants.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Clinic,
          as: 'clinics',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
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
    const covenants = await Covenants.findAll({
      where: { active: true },
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
        {
          model: Clinic,
          as: 'clinic',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(covenants);
  }

  async delete(req, res) {
    const covenants = await Covenants.destroy({
      where: { id: req.params.id },
    });

    return res.json(covenants);
  }
}

export default new CovenantsController();
