import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Comments from '../models/Comments';
import File from '../models/File';
import User from '../models/User';
import Channel from '../models/Channel';

class CommentsController {
  async index(req, res) {
    const comments = await Comments.findAll({
      where: { video_id: req.params.video },
      order: [['id', 'DESC']],
      include: [
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

    return res.json(comments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.string().required(),
      video_id: Yup.string().required(),
      channel_id: Yup.string().required(),
      comment: Yup.string().required(),
      reply: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: `Validation fails ${JSON.stringify(schema)}` });
    }

    const { user_id, video_id, channel_id, comment } = await Comments.create(
      req.body
    );

    return res.json({
      user_id,
      video_id,
      channel_id,
      comment,
    });
  }
}

export default new CommentsController();
