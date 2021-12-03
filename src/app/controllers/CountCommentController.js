import Comments from '../models/Comments';

class CountCommentsController {
  async index(req, res) {
    const Count = await Comments.findAndCountAll({
      where: { video_id: req.params.video },
    });

    // const Count = await Comments.countDocuments({ video_id: req.params.video });
    return res.json({ CountComment: Count.count });
  }
}

export default new CountCommentsController();
