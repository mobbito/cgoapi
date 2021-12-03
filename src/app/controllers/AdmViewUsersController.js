import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class AdmViewUsersController {
  async index(req, res) {
    const pacientes = await User.findAll({
      where: { provider: false, id: req.params.idPaciente },
      // attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
        // { model: Company, as: 'company', attributes: ['id', 'name'] },
      ],
    });

    return res.json(pacientes);
  }
}

export default new AdmViewUsersController();
