import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Video from '../models/Video';
import File from '../models/File';
import User from '../models/User';
import Channel from '../models/Channel';
import Notification from '../schemas/Notification';

import Like from '../schemas/Likes';

class VideoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.string().required(),
      channel_id: Yup.string().required(),
      avatar_id: Yup.string(),
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails ${schema}` });
    }

    // await Notification.create({
    //   content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
    //   user: provider_id,
    // });

    const { id, user_id, name, channel_id, description } = await Video.create(
      req.body
    );

    const user = await User.findAll();

    // const formattedDate = format(
    //   new Date(),
    //   "'dia' dd 'de' MMMM', às'H:mm'h' ",
    //   { locale: pt }
    // );
    const channel = await Channel.findOne({
      where: {
        id: channel_id,
      },

      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    user.map(usr => {
      Notification.create({
        content: `${channel.name} envio o vídeo ${name}`,
        user: usr.id,
        provider: user_id,
        video: id,
        channel_name: channel.name,
        channel_avatar: channel.avatar.url,
        date: new Date(),
      });
    });

    return res.json({
      id,
      user_id,
      name,
      description,
      channel_id,
      avatar: channel.avatar.url,
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
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
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
    const video = await Video.findAll({
      where: { active: true, channel_id: req.params.channelId },
      order: [['id', 'DESC']],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'video', attributes: ['name', 'path', 'url'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
          ],
        },
        {
          model: Channel,
          as: 'channel',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
          ],
        },
      ],
    });

    return res.json(video);
  }

  async delete(req, res) {
    const channel = await Video.findByPk(req.params.channelId, {
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

export default new VideoController();
