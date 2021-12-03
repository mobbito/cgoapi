import * as Yup from 'yup';
import pagarme from 'pagarme';
import { format } from 'date-fns';
import Cards from '../models/Cards';
import User from '../models/User';

class CardsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      operadora: Yup.string(),
      numerocartao: Yup.string().required(),
      titular: Yup.string().required(),
      validade: Yup.string().required(),
      cvv: Yup.string(),
      cpftitular: Yup.string().required(),
      cep: Yup.string().required(),
      birthday: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      cidade: Yup.string().required(),
      uf: Yup.string().required(),
      principal: Yup.string(),
      status: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      operadora,
      numerocartao,
      titular,
      validade,
      cvv,
      cpftitular,
      birthday,
      phone,
      email,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      uf,
      principal,
      status,
    } = req.body;

    const isCardExist = await Cards.findOne({
      where: { user_id: req.userId, numerocartao },
    });

    if (isCardExist) {
      return res.status(401).json({
        error: 'Desculpe, este cartão de credito já esta cadastrado',
      });
    }

    const isPrincipal = await Cards.findOne({
      where: { user_id: req.userId, principal: true },
    });

    if (isPrincipal && principal) {
      await Cards.update(
        { principal: false },
        { where: { user_id: req.userId, principal: true } }
      );
    }

    const CardNumber = numerocartao.replace(' ', '');
    const ExpirationDate = validade.replace('/', '');

    pagarme.client
      .connect({ api_key: 'ak_test_mZMdCsQ1dggXrIvncyfdAGhtRvmjj4' })
      .then((client) =>
        client.cards.create({
          card_number: CardNumber,
          card_holder_name: titular,
          card_expiration_date: ExpirationDate,
          card_cvv: cvv,
        })
      )
      .then((card) => {
        CreateUser(card.id);
      })
      .catch((e) => console.log(e.response));
    // console.log(carr);
    // const phone1 = phone.replace('(', '');
    // const phone2 = phone1.replace(')', '');
    // const phone3 = phone2.replace(' ', '');
    // const phone4 = phone3.replace('-', '');

    // const cpf1 = cpftitular.replace('.', '');
    // const cpf2 = cpf1.replace('.', '');
    // const cpf3 = cpf2.replace('-', '');

    // pagarme.client
    //   .connect({ api_key: 'ak_test_mZMdCsQ1dggXrIvncyfdAGhtRvmjj4' })
    //   .then(client =>
    //     client.customers.create({
    //       external_id: '#12345d789',
    //       name: titular,
    //       type: 'individual',
    //       country: 'br',
    //       email,
    //       documents: [
    //         {
    //           type: 'cpf',
    //           number: cpf3,
    //         },
    //       ],
    //       phone_numbers: [`+55${phone4}`],
    //       birthday: format(new Date(birthday), 'yyyy-MM-dd'),
    //     })
    //   )
    //   .then(customer => {
    //     NumCli = customer.id;

    //     CreateUser(NumCard, customer.id);
    //   })
    //   .catch(e => console.log(e.response));

    async function CreateUser(cards, user) {
      const card = await Cards.create({
        user_id: req.userId,
        operadora,
        numerocartao,
        cards_id: cards,
        titular,
        validade,
        cpftitular,
        cep,
        email,
        phone,
        rua,
        numero,
        complemento,
        cidade,
        uf,
        principal: true,
        status,
      });
      return res.json(card);
    }
  }

  async index(req, res) {
    const card = await Cards.findAll({
      where: { user_id: req.userId },
    });

    return res.json(card);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      operadora: Yup.string(),
      numerocartao: Yup.string().required(),
      titular: Yup.string().required(),
      validade: Yup.string().required(),
      cpftitular: Yup.string().required(),
      cep: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      cidade: Yup.string().required(),
      uf: Yup.string().required(),
      principal: Yup.string(),
      status: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      id,
      operadora,
      numerocartao,
      titular,
      validade,
      cpftitular,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      uf,
      principal,
      status,
    } = req.body;

    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    const isCardExist = await Cards.findOne({
      where: { user_id: req.userId, numerocartao },
    });

    const cards = await Cards.findByPk(id);

    const isPrincipal = await Cards.findOne({
      where: { user_id: req.userId, principal: true },
    });

    if (isPrincipal && principal) {
      await Cards.update(
        { principal: false },
        { where: { user_id: req.userId, principal: true } }
      );
    }

    if (!isPrincipal && !principal) {
      var SetPrincipal = true;
    } else {
      var SetPrincipal = principal;
    }

    const card = await cards.update({
      id,
      operadora,
      numerocartao,
      titular,
      validade,
      cpftitular,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      uf,
      principal: SetPrincipal,
      status,
    });

    return res.json(card);
  }
}

export default new CardsController();
