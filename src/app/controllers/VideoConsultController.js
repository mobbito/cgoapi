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

class VideoConsultController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null, online: true },
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

export default new VideoConsultController();
