import Like from '../schemas/Likes';

class LikesController {
  async index(req, res) {
    const CkecaLike = await Like.findOne({
      video: req.params.video,
      user: req.params.user,
    });
    let Curtiu = false;

    if (CkecaLike) {
      Curtiu = true;
    } else {
      Curtiu = false;
    }
    const QtdLikes = await Like.countDocuments({ video: req.params.video });

    return res.json({ likes: QtdLikes, Curtiu });
  }

  async store(req, res) {
    const Ckecklikes = await Like.findOne(req.body).sort({ createdAt: 'desc' });

    if (Ckecklikes) {
      const curid = Ckecklikes._id;

      await Like.findByIdAndRemove(curid).then(result => {});
    } else {
      await Like.create(req.body);
    }
    const { user, video, channel } = req.body;
    const QtdLikes = await Like.countDocuments(req.body.video);

    return res.json({
      user,
      video,
      channel,
      QtdLikes,
    });
  }
}

export default new LikesController();
