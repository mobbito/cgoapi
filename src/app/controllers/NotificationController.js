import Notification from '../schemas/Notification';
import User from '../models/User';
import Channel from '../models/Channel';
import File from '../models/File';

class NotificationController {
  async index(req, res) {
    const checkisProvider = await User.findOne({
      where: { id: req.params.id, provider: true },
    });

    // if (!checkisProvider) {
    //   return res
    //     .status(401)
    //     .json({ error: 'O usuario logado nao eh um prestador de servico' });
    // }

    const notifications = await Notification.find({
      user: req.params.id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
