import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class AdmUsersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      avatar_id: Yup.string(),
      data_nascimento: Yup.string(),
      rg: Yup.string(),
      telefone_casa: Yup.string(),
      telefone_trabalho: Yup.string(),
      cep: Yup.string(),
      endereco: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      bairro: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
      pais: Yup.string(),
      naturalidade: Yup.string(),
      naturalidade_estado: Yup.string(),
      nacionalidade: Yup.string(),
      etnia: Yup.string(),
      religiao: Yup.string(),
      estado_civil: Yup.string(),
      escolaridade: Yup.string(),
      profissao: Yup.string(),
      obito: Yup.string(),
      ativo: Yup.string(),
      cns: Yup.string(),
      informacoes_adicionais: Yup.string(),
      id_clinica: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
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

    const {
      id,
      name,
      cpf,
      phone,
      avatar_id,
      data_nascimento,
      rg,
      telefone_casa,
      telefone_trabalho,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      naturalidade,
      naturalidade_estado,
      nacionalidade,
      etnia,
      religiao,
      estado_civil,
      escolaridade,
      profissao,
      obito,
      ativo,
      cns,
      informacoes_adicionais,
      id_clinica,
      provider,
      email,
    } = await User.create(req.body);
    return res.json({
      id,
      name,
      cpf,
      phone,
      avatar_id,
      data_nascimento,
      rg,
      telefone_casa,
      telefone_trabalho,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      naturalidade,
      naturalidade_estado,
      nacionalidade,
      etnia,
      religiao,
      estado_civil,
      escolaridade,
      profissao,
      obito,
      ativo,
      cns,
      informacoes_adicionais,
      id_clinica,
      provider,
      email,
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

  async index(req, res) {
    const clients = await User.findAll({
      where: { provider: false },
      // attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
        // { model: Company, as: 'company', attributes: ['id', 'name'] },
      ],
    });

    return res.json(clients);
  }
}

export default new AdmUsersController();
