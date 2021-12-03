import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import Hour from '../models/Hour';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    console.log('joao');
    if (!date) {
      return res.status(400).json({ error: 'Data invalida ' });
    }

    const searchDate = Number(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = await Hour.findAll({
      where: {
        provider_id: req.params.providerId,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const available = schedule.map((time) => {
      const TimeLocal = time.hour.substr(-20, 5);
      const [hours, minute] = TimeLocal.split(':');

      const value = setSeconds(
        setMinutes(setHours(searchDate, hours), minute),
        0
      );

      return {
        time: TimeLocal,
        value: format(value, "yyy-MM-dd'T'HH:mm:ssxxx"),
        day: false,
        available:
          isAfter(value, new Date()) &&
          !appointment.find((a) => format(a.date, 'HH:mm') === TimeLocal),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
