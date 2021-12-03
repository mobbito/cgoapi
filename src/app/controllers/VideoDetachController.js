import Video from '../models/Video';
import File from '../models/File';
import User from '../models/User';
import Channel from '../models/Channel';

class VideoController {
  async index(req, res) {
    const video = await Video.findAll({
      where: { active: true, detach: true },
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
}

export default new VideoController();
