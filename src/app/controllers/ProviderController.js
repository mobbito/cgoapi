import User from '../models/User';
import File from '../models/File';
// import Company from '../models/Company';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      // attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
        // { model: Company, as: 'company', attributes: ['id', 'name'] },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
