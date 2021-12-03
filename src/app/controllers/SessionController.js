import jwt from 'jsonwebtoken';

import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';
import Company from '../models/Company';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Company,
          as: 'company',
          attributes: ['id'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.ckeckPassord(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      avatar,
      provider,
      company,
      premium,
      activitypremium,
      subscription_id,
    } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
        company,
        premium,
        activitypremium,
        subscription_id,
      },
      token: jwt.sign({ id }, authConfig.secret),
      // token: jwt.sign({ id }, authConfig.secret, {
      //   expiresIn: authConfig.expiresIn,
      // }),
    });
  }
}

export default new SessionController();
