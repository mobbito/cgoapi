/* eslint-disable no-buffer-constructor */
import * as Yup from 'yup';
import axios from 'axios';
import fs from 'fs';
import pagarme from 'pagarme';
// import Buffer from 'buffer';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import request from 'request';
import qs from 'qs';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Services from '../models/Services';
import Covenants from '../models/Covenants';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date', 'past', 'cancelable', 'informations'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
        // {
        //   model: Services,
        //   as: 'service',
        //   attributes: ['id', 'name'],
        // },
        {
          model: Covenants,
          as: 'covenants',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      price: Yup.string().required(),
      covenants_id: Yup.number().required(),
      informations: Yup.string().required(),
      date: Yup.date().required(),
      payCard: Yup.string(),
      hashCard: Yup.string(),
    });
    // console.log(req.body);
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }
    const { provider_id, price, covenants_id, informations, date } = req.body;

    /**
     * check is provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    const hourStart = startOfHour(parseISO(date));
    /**
     * verifica se a data e a hora eh a atual eh maior que a data e hora informada no agendamento
     */
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Desculpa esta data nao eh permitida' });
    }

    /** verifica se o prestador de service tem esse horario disponivel */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Este horario nao esta disponivel' });
    }
    if (req.body.payCard === true) {
      console.log('chegou aqui');

      const tt = {
        items: [
          {
            amount: 2990,
            description: 'Curso de React Native',
            quantity: 1,
          },
        ],
        customer: {
          name: 'Joao Batista',
          email: 'jb.spitaletti@hotmail.com',
        },
        // ip: '52.168.67.32',
        // location: {
        //   latitude: '-22.970722',
        //   longitude: '43.182365',
        // },
        shipping: {
          amount: 100,
          description: 'Stark',
          recipient_name: 'Joao Batista',
          recipient_phone: '5563985151371',
          address: {
            line_1: 'Rua 02, qd 22, lt 24 casa 2',
            zip_code: '77060384',
            city: 'Palmas',
            state: 'TO',
            country: 'BR',
          },
        },
        // antifraud: {
        //   type: 'clearsale',
        //   clearsale: {
        //     custom_sla: '90',
        //   },
        // },
        // session_id: '322b821a',
        // device: {
        //   platform: 'ANDROID OS',
        // },
        payments: [
          {
            payment_method: 'credit_card',
            credit_card: {
              recurrence: false,
              installments: 1,
              statement_descriptor: 'AVENGERS',
              card: {
                number: '5555666677778884',
                holder_name: 'Joao Batista',
                exp_month: 12,
                exp_year: 22,
                cvv: '123',
                billing_address: {
                  line_1: '10880, Rua 02 Qd 22 Lt 24 Casa2',
                  zip_code: '77060384',
                  city: 'Palmas',
                  state: 'TO',
                  country: 'BR',
                },
              },
            },
          },
        ],
      };

      const body = tt;

      console.log('indo para axios');
      // axios
      //   .post('https://api.pagar.me/core/v5/orders', body, {
      //     headers: {
      //       Authorization: `Basic sk_test_L8lVDJYhMTx1nvko`,
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // contato pagarme
      // 4004-1330
      // pagarme.client
      //   .connect({ api_key: 'sk_test_L8lVDJYhMTx1nvko' })
      //   .then((client) => client.transactions.all())
      //   .then((transactions) => console.log(transactions));

      const options = {
        method: 'POST',
        uri: 'https://api.pagar.me/core/v5/orders',
        headers: {
          Authorization: `Basic ${new Buffer(
            'sk_test_L8lVDJYhMTx1nvko:'
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        json: body,
      };

      request(options, (error, response, body) => {
        console.log(response.body);
      });

      // pagarme.client
      //   .connect({ encryption_key: 'sk_test_L8lVDJYhMTx1nvko' })
      //   .then((client) =>
      //     client.transactions.create({
      //       amount: 100,
      //       payment_method: 'credit_card',
      //       card_hash: req.body.hashCard,
      //       postback_url: 'http://requestb.in/pkt7pgpk',
      //       customer: {
      //         name: 'Aardvark Silva',
      //         email: 'aardvark.silva@pagar.me',
      //         document_number: '18152564000105',
      //         address: {
      //           street: 'Avenida Brigadeiro Faria Lima',
      //           street_number: '1811',
      //           neighborhood: 'Jardim Paulistano',
      //           zipcode: '01451001',
      //         },
      //         phone: {
      //           ddi: '55',
      //           ddd: '11',
      //           number: '99999999',
      //         },
      //       },
      //       metadata: {
      //         idProduto: '13933139',
      //       },
      //     })
      //   );

      // pagarme.client
      //   .connect({ encryption_key: 'sk_test_L8lVDJYhMTx1nvko' })
      //   .then((client) =>
      //     client.transactions.create({
      //       amount: price.replace('.', ''),
      //       card_hash: req.body.hashCard,
      //       customer: {
      //         external_id: req.userId.toString(),
      //         name: 'Joao Batista',
      //         type: 'individual',
      //         country: 'br',
      //         email: 'jb.spitaletti@gmail.com',
      //         documents: [
      //           {
      //             type: 'cpf',
      //             number: '97677337104',
      //           },
      //         ],
      //         phone_numbers: [`+5563985151371`],
      //         birthday: format(new Date('1981-04-02'), 'yyyy-MM-dd'),
      //       },
      //       billing: {
      //         name: 'Joao Batista',
      //         address: {
      //           country: 'br',
      //           state: 'TO',
      //           city: 'Palmas',
      //           neighborhood: 'Complemento',
      //           street: 'Rua 02',
      //           street_number: '22',
      //           zipcode: '77060384',
      //           // zipcode: card.cep.replace('-', ''),
      //         },
      //       },

      //       items: [
      //         {
      //           id: '1',
      //           title: 'Consulta medica',
      //           unit_price: price.replace('.', ''),
      //           quantity: 1,
      //           tangible: true,
      //         },
      //       ],
      //     })
      //   )
      //   .then(
      //     (transaction) => res.json(transaction)

      //     // if (transaction.status === 'paid') {
      //     // }
      //     // if (transaction.status === 'refused') {
      //     //   return res.json(transaction);
      //     // }
      //     // return res.json(Pagamento);
      //   );
    }
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      price,
      covenants_id,
      informations,
      date,
    });
    console.log(appointment);
    /** Notificar Usuario */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às'H:mm'h' ",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res
        .json(401)
        .json({ error: 'Vocë nao tem permissao para cancelar o agendamento' });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'Você so cancelar agendamentos com 2 horas de antecedencia',
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
