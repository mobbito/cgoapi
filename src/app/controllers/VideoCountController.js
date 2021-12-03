import Video from '../models/Video';

class VideoCountController {
  async update(req, res) {
    const video = await Video.findByPk(req.params.video);

    const Ct = video.views + 1;

    await video.update({ views: Ct });

    return res.json({
      video,
    });
  }
}

export default new VideoCountController();
