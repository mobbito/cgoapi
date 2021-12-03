import * as Yup from 'yup';

import News from '../schemas/News';

class NewsController {
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

    const news = await News.create({
      clinic_id,
      photo_id,
      photo_url,
      title,
      text,
    });

    return res.json(news);
  }

  async index(req, res) {
    const news = await News.find({
      active: true,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(news);
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

    const news = await News.findByIdAndUpdate(req.params.id, {
      clinic_id,
      photo_id,
      photo_url,
      title,
      text,
    });

    return res.json(news);
  }

  async delete(req, res) {
    const news = await News.deleteOne({ _id: req.params.id });

    return res.json(news);
  }
}

export default new NewsController();
