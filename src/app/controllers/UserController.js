import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    console.log(req.body);
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExistis = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExistis) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, cpf, phone, email, provider } = await User.create(
      req.body
    );
    return res.json({
      id,
      name,
      cpf,
      phone,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      phone: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExistis = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExistis) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.ckeckPassord(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // const { id, name, provider } = await user.update(req.body);
    await user.update(req.body);
    const {
      id,
      name,
      cpf,
      phone,
      avatar,
      provider,
      premium,
      activitypremium,
      subscription_id,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      cpf,
      phone,
      email,
      avatar,
      provider,
      premium,
      activitypremium,
      subscription_id,
    });
  }
}

export default new UserController();
