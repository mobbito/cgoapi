import * as Yup from 'yup';

import Procedures from '../models/Procedures';
import Clinic from '../models/Clinic';
import Services from '../models/Services';
import File from '../models/File';

class ProceduresController {
  async store(req, res) {
    const schema = Yup.object().shape({
      clinic_id: Yup.string().required(),
      service_id: Yup.string().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails ${schema}` });
    }

    const { id, clinic_id, service_id, name, avatar_id, description } =
      await Procedures.create(req.body);
    return res.json({
      id,
      clinic_id,
      service_id,
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

    const procedures = await Procedures.findByPk(req.params.id);

    await procedures.update(req.body);
    const { id, clinic_id, service_id, name, avatar_id, description, active } =
      await Procedures.findByPk(req.params.id, {
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
          {
            model: Services,
            as: 'services',
            attributes: ['id', 'name', 'price'],
          },
        ],
      });
    return res.json({
      id,
      clinic_id,
      service_id,
      name,
      avatar_id,
      description,
      active,
    });
  }

  async index(req, res) {
    const procedures = await Procedures.findAll({
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
        {
          model: Services,
          as: 'services',
          attributes: ['id', 'name', 'price'],
        },
      ],
    });

    return res.json(procedures);
  }

  async delete(req, res) {
    const procedures = await Procedures.destroy({
      where: { id: req.params.id },
    });

    return res.json(procedures);
  }
}

export default new ProceduresController();
