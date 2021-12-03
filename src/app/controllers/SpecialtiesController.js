import * as Yup from 'yup';

import Specialties from '../schemas/Specialties';

class SpecialtiesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      clinic_id: Yup.string().required(),
      photo_id: Yup.string(),
      photo_url: Yup.string(),
      title: Yup.string().required(),
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { clinic_id, photo_id, photo_url, title, text } = req.body;

    const specialties = await Specialties.create({
      clinic_id,
      photo_id,
      photo_url,
      title,
      text,
    });

    return res.json(specialties);
  }

  async index(req, res) {
    const specialties = await Specialties.find({
      active: true,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(specialties);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      clinic_id: Yup.string().required(),
      photo_id: Yup.string(),
      photo_url: Yup.string(),
      title: Yup.string().required(),
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { clinic_id, photo_id, photo_url, title, text } = req.body;

    const specialties = await Specialties.findByIdAndUpdate(req.params.id, {
      clinic_id,
      photo_id,
      photo_url,
      title,
      text,
    });

    return res.json(specialties);
  }

  async delete(req, res) {
    const specialties = await Specialties.deleteOne({ _id: req.params.id });

    return res.json(specialties);
  }
}

export default new SpecialtiesController();
