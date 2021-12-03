import * as Yup from 'yup';

import Company from '../models/Company';
import File from '../models/File';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      district: Yup.string().required(),
      number: Yup.string().required(),
      location_id: Yup.string().required(),
      postcode: Yup.string().required(),
      phone: Yup.string().required(),
      contact: Yup.string().required(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExistis = await Company.findOne({
      where: { email: req.body.email },
    });

    if (userExistis) {
      return res.status(400).json({ error: 'Company already exists' });
    }

    const { id, name, email, phone } = await Company.create(req.body);
    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      district: Yup.string().required(),
      number: Yup.string().required(),
      location_id: Yup.number().required(),
      postcode: Yup.string().required(),
      phone: Yup.string().required(),
      contact: Yup.string().required(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email } = req.body;

    const company = await Company.findByPk(req.params.companyId);

    if (email !== company.email) {
      const userExistis = await Company.findOne({
        where: { email: req.body.email },
      });

      if (!userExistis) {
        return res.status(400).json({ error: 'Company not already exists' });
      }
    }

    // const { id, name, provider } = await user.update(req.body);
    await company.update(req.body);
    const { id, name, avatar } = await Company.findByPk(req.params.companyId, {
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
      avatar,
      email,
    });
  }

  async index(req, res) {
    const company = await Company.findAll({
      where: { activity: true },
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(company);
  }
}

export default new CompanyController();
