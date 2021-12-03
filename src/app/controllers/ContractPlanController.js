import * as Yup from 'yup';
import pagarme from 'pagarme';
import { format } from 'date-fns';
import Cards from '../models/Cards';
import User from '../models/User';
import Invoices from '../schemas/Invoices';

class CardsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cards_id: Yup.string().required(),
      costumer_id: Yup.string(),
      titular: Yup.string().required(),
      cpftitular: Yup.string().required(),
      cep: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      cards_id,
      titular,
      cpftitular,
      cep,
      email,
      phone,
      rua,
      numero,
      complemento,
    } = req.body;

    const phone1 = phone.replace('(', '');
    const phone2 = phone1.replace(')', '');
    const phone3 = phone2.replace(' ', '');
    const phone4 = phone3.replace('-', '');
    const phone5 = phone4.substr(2);
    const DDD = phone4.substr(-20, 2);

    const cpf1 = cpftitular.replace('.', '');
    const cpf2 = cpf1.replace('.', '');
    const cpf3 = cpf2.replace('-', '');

    const CEP = cep.replace('-', '');

    // ak_live_9uAz1ZFT8nclo1l4UcwIDpeeJM1qFZ;
    // ak_test_mZMdCsQ1dggXrIvncyfdAGhtRvmjj4
    pagarme.client
      .connect({ api_key: 'ak_live_9uAz1ZFT8nclo1l4UcwIDpeeJM1qFZ' })
      .then(client =>
        client.subscriptions.create({
          plan_id: 493248,
          card_id: cards_id,
          postback_url: 'http://requestb.in/zyn5obzy',
          payment_method: 'credit_card',
          customer: {
            email,
            name: titular,
            document_number: cpf3,
            address: {
              zipcode: CEP,
              neighborhood: complemento,
              street: rua,
              street_number: numero,
            },
            phone: {
              number: phone5,
              ddd: DDD,
            },
          },
        })
      )
      .then(card => {
        console.log(card.current_transaction);
        if (card.current_transaction.status === 'paid') {
          async function Gravar() {
            const user = await User.findByPk(req.userId);
            console.log(user);
            user.premium = true;
            user.subscription_id = card.current_transaction.subscription_id;
            user.activitypremium = new Date();

            await user.save();

            const invoice = await Invoices.create({
              description: 'Assinatura Mensal Premium',
              user: req.userId,
              username: user.name,
              plan: 493248,
              price: card.current_transaction.amount,
              datecreate: new Date(),
              datevcto: new Date(),
              datepay: new Date(),
              pay: true,
              subscription_id: card.current_transaction.subscription_id,
              acquirer_id: card.current_transaction.acquirer_id,
              authorization_code: card.current_transaction.authorization_code,
              tid: card.current_transaction.tid,
              antifraud_score: card.current_transaction.antifraud_score,
              ip: card.current_transaction.ip,
            });

            // return res.json(invoice);
            return res.json('criado');
          }
          Gravar();
        }

        if (card.current_transaction.status === 'refused') {
          async function Gravar() {
            const user = await User.findByPk(req.userId);
            console.log(user);
            user.premium = false;
            // user.subscription_id = card.current_transaction.subscription_id;
            user.activitypremium = new Date();

            const invoice = await Invoices.create({
              description: 'Assinatura Mensal Premium',
              user: req.userId,
              username: user.name,
              plan: 493248,
              price: card.current_transaction.amount,
              datecreate: new Date(),
              datevcto: new Date(),
              datepay: new Date(),
              pay: false,
              subscription_id: card.current_transaction.subscription_id,
              acquirer_id: card.current_transaction.acquirer_id,
              authorization_code: card.current_transaction.authorization_code,
              tid: card.current_transaction.tid,
              antifraud_score: card.current_transaction.antifraud_score,
              ip: card.current_transaction.ip,
            });
          }
          console.log(`Dados da Transacao ${card.current_transaction.status}`);
          Pagamento = 'recusado';
          return res.json(Pagamento);
        }
      })

      .catch(e => console.log(e.response));

    // async function CreateUser(cards, user) {
    //   const card = await Cards.create({
    //     user_id: req.userId,
    //     operadora,
    //     numerocartao,
    //     costumer_id: user,
    //     cards_id: cards,
    //     titular,
    //     validade,
    //     cpftitular,
    //     cep,
    //     rua,
    //     numero,
    //     complemento,
    //     cidade,
    //     uf,
    //     principal: true,
    //     status,
    //   });
    //   return res.json(card);
    // }
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
