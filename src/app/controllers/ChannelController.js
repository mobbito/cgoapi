import * as Yup from 'yup';

import Channel from '../models/Channel';
import File from '../models/File';
import User from '../models/User';

class ChannelController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.string().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails ${schema}` });
    }

    const { id, user_id, name, description } = await Channel.create(req.body);
    return res.json({
      id,
      user_id,
      name,
      description,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      description: Yup.string().required(),
      active: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const channel = await Channel.findByPk(req.params.channelId);

    await channel.update(req.body);
    const { id, name, description, avatar, active } = await Channel.findByPk(
      req.params.channelId,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );
    return res.json({
      id,
      name,
      description,
      avatar,
      active,
    });
  }

  async index(req, res) {
    const channel = await Channel.findAll({
      where: { active: true },
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(channel);
  }

  async delete(req, res) {
    const channel = await Channel.findByPk(req.params.channelId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (channel.user_id !== req.userId) {
      return res
        .json(401)
        .json({ error: 'Vocë nao tem permissao para cancelar este canal' });
    }

    channel.active = false;
    await channel.save();

    return res.json(channel);
  }
}

export default new ChannelController();
